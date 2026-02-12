// Live chat
/**
 * Crisp Live Chat Integration
 * Handles website chat conversations, visitor tracking, and real-time messaging
 */

import Crisp from 'crisp-api';

// ============== TYPES ==============

export interface CrispConfig {
  websiteId: string;
  identifier: string;
  key: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  from: 'customer' | 'agent' | 'system';
  author: {
    name: string;
    email?: string;
    type: 'user' | 'operator' | 'bot';
  };
  content: string;
  type: 'text' | 'file' | 'audio' | 'video';
  timestamp: Date;
  read: boolean;
  delivered: boolean;
}

export interface ChatConversation {
  id: string;
  websiteId: string;
  customer: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    ip?: string;
  };
  device: {
    browser: string;
    os: string;
    resolution?: string;
  };
  location: {
    country: string;
    city?: string;
    timezone?: string;
  };
  segments: string[];
  status: 'pending' | 'active' | 'resolved';
  assignedTo?: {
    agentId: string;
    name: string;
  };
  createdAt: Date;
  lastActivityAt: Date;
  metadata: Record<string, any>;
}

export interface CrispWebhookPayload {
  type: string;
  website_id: string;
  session_id: string;
  data: any;
  timestamp: number;
}

// ============== MAIN SERVICE ==============

export class CrispService {
  private client: any;
  private websiteId: string;
  private isConnected: boolean = false;
  private messageHandlers: ((message: ChatMessage) => void)[] = [];
  private conversationHandlers: ((conversation: ChatConversation) => void)[] = [];

  constructor(config: CrispConfig) {
    this.websiteId = config.websiteId;
    this.client = new Crisp();
    this.client.authenticateTier('plugin', config.identifier, config.key);
    this.setupEventListeners();
  }

  /**
   * Setup Crisp event listeners
   */
  private setupEventListeners(): void {
    // Connection events
    this.client.on('ready', () => {
      this.isConnected = true;
      console.log('✅ Crisp connected successfully');
    });

    this.client.on('error', (error: Error) => {
      console.error('❌ Crisp connection error:', error);
    });

    // Message events
    this.client.on('message:send', (sessionId: string, message: any) => {
      this.handleIncomingMessage(sessionId, message);
    });

    this.client.on('message:received', (sessionId: string, message: any) => {
      this.handleAgentMessage(sessionId, message);
    });

    // Session events
    this.client.on('session:update', (sessionId: string, data: any) => {
      this.handleSessionUpdate(sessionId, data);
    });

    // User presence
    this.client.on('user:online', (sessionId: string) => {
      console.log(`🟢 Customer ${sessionId} is online`);
    });

    this.client.on('user:offline', (sessionId: string) => {
      console.log(`🔴 Customer ${sessionId} is offline`);
    });
  }

  /**
   * Handle incoming message from customer
   */
  private async handleIncomingMessage(sessionId: string, message: any): Promise<void> {
    try {
      const conversation = await this.getConversation(sessionId);
      const chatMessage: ChatMessage = {
        id: message.id || `msg_${Date.now()}`,
        conversationId: sessionId,
        from: 'customer',
        author: {
          name: conversation.customer.name,
          email: conversation.customer.email,
          type: 'user'
        },
        content: message.content || '',
        type: this.getMessageType(message),
        timestamp: new Date(message.timestamp || Date.now()),
        read: false,
        delivered: true
      };

      // Notify all handlers
      this.messageHandlers.forEach(handler => handler(chatMessage));
      
      // Auto-respond if configured
      await this.checkForAutoResponse(chatMessage, conversation);
      
    } catch (error) {
      console.error('Error handling incoming message:', error);
    }
  }

  /**
   * Handle agent reply
   */
  private handleAgentMessage(sessionId: string, message: any): void {
    const agentMessage: ChatMessage = {
      id: message.id,
      conversationId: sessionId,
      from: 'agent',
      author: {
        name: message.user?.name || 'Support Agent',
        email: message.user?.email,
        type: 'operator'
      },
      content: message.content,
      type: 'text',
      timestamp: new Date(),
      read: true,
      delivered: true
    };

    this.messageHandlers.forEach(handler => handler(agentMessage));
  }

  /**
   * Handle session updates
   */
  private async handleSessionUpdate(sessionId: string, data: any): Promise<void> {
    try {
      const conversation = await this.getConversation(sessionId);
      this.conversationHandlers.forEach(handler => handler(conversation));
    } catch (error) {
      console.error('Error handling session update:', error);
    }
  }

  // ============== PUBLIC METHODS ==============

  /**
   * Send message to customer
   */
  async sendMessage(conversationId: string, content: string): Promise<ChatMessage> {
    try {
      if (!this.isConnected) {
        throw new Error('Crisp not connected');
      }

      await this.client.website.sendMessageInConversation(
        this.websiteId,
        conversationId,
        {
          type: 'text',
          content: content,
          from: 'operator'
        }
      );

      const message: ChatMessage = {
        id: `msg_${Date.now()}`,
        conversationId,
        from: 'agent',
        author: {
          name: 'Support Agent',
          type: 'operator'
        },
        content,
        type: 'text',
        timestamp: new Date(),
        read: false,
        delivered: true
      };

      return message;
    } catch (error) {
      console.error('Failed to send Crisp message:', error);
      throw error;
    }
  }

  /**
   * Get conversation details
   */
  async getConversation(conversationId: string): Promise<ChatConversation> {
    try {
      const session = await this.client.website.getSession(this.websiteId, conversationId);
      
      return {
        id: conversationId,
        websiteId: this.websiteId,
        customer: {
          id: session.user_id,
          name: session.user?.name || 'Anonymous',
          email: session.user?.email,
          phone: session.user?.phone,
          avatar: session.user?.avatar,
          ip: session.ip
        },
        device: {
          browser: session.device?.browser || 'Unknown',
          os: session.device?.os || 'Unknown',
          resolution: session.device?.resolution
        },
        location: {
          country: session.geolocation?.country || 'Unknown',
          city: session.geolocation?.city,
          timezone: session.geolocation?.timezone
        },
        segments: session.segments || [],
        status: session.state || 'pending',
        assignedTo: session.assigned?.user_id ? {
          agentId: session.assigned.user_id,
          name: session.assigned.name
        } : undefined,
        createdAt: new Date(session.created_at),
        lastActivityAt: new Date(session.updated_at),
        metadata: session.meta || {}
      };
    } catch (error) {
      console.error('Failed to get conversation:', error);
      throw error;
    }
  }

  /**
   * Get all active conversations
   */
  async getActiveConversations(page: number = 1): Promise<ChatConversation[]> {
    try {
      const sessions = await this.client.website.getSessions(this.websiteId, page, 50);
      
      const conversations: ChatConversation[] = await Promise.all(
        sessions.map((session: any) => this.getConversation(session.session_id))
      );

      return conversations.filter(c => c.status !== 'resolved');
    } catch (error) {
      console.error('Failed to get active conversations:', error);
      return [];
    }
  }

  /**
   * Assign conversation to agent
   */
  async assignConversation(conversationId: string, agentEmail: string): Promise<boolean> {
    try {
      await this.client.website.assignConversation(
        this.websiteId,
        conversationId,
        { email: agentEmail }
      );
      return true;
    } catch (error) {
      console.error('Failed to assign conversation:', error);
      return false;
    }
  }

  /**
   * Resolve/close conversation
   */
  async resolveConversation(conversationId: string): Promise<boolean> {
    try {
      await this.client.website.updateConversationState(
        this.websiteId,
        conversationId,
        'resolved'
      );
      return true;
    } catch (error) {
      console.error('Failed to resolve conversation:', error);
      return false;
    }
  }

  /**
   * Send proactive chat invitation
   */
  async sendProactiveInvitation(
    visitorId: string,
    message: string,
    delay: number = 3000
  ): Promise<void> {
    try {
      // Wait for specified delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      await this.client.website.sendMessageInConversation(
        this.websiteId,
        visitorId,
        {
          type: 'text',
          content: message,
          from: 'bot',
          proactive: true
        }
      );
      
      console.log(`💬 Proactive chat sent to ${visitorId}`);
    } catch (error) {
      console.error('Failed to send proactive invitation:', error);
    }
  }

  /**
   * Get visitor info by email
   */
  async findVisitorByEmail(email: string): Promise<ChatConversation | null> {
    try {
      const sessions = await this.client.website.getSessions(this.websiteId, 1, 100);
      
      for (const session of sessions) {
        if (session.user?.email === email) {
          return this.getConversation(session.session_id);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to find visitor:', error);
      return null;
    }
  }

  /**
   * Set visitor data
   */
  async setVisitorData(
    conversationId: string,
    data: Partial<ChatConversation['customer']>
  ): Promise<void> {
    try {
      await this.client.website.updateSessionMetas(
        this.websiteId,
        conversationId,
        {
          user: data
        }
      );
    } catch (error) {
      console.error('Failed to set visitor data:', error);
    }
  }

  /**
   * Get message type from content
   */
  private getMessageType(message: any): ChatMessage['type'] {
    if (message.type === 'file' || message.attachments) return 'file';
    if (message.type === 'audio') return 'audio';
    if (message.type === 'video') return 'video';
    return 'text';
  }

  /**
   * Check for auto-response rules
   */
  private async checkForAutoResponse(
    message: ChatMessage,
    conversation: ChatConversation
  ): Promise<void> {
    const content = message.content.toLowerCase();
    
    // Common auto-responses
    if (content.includes('price') || content.includes('cost') || content.includes('pricing')) {
      await this.sendMessage(
        conversation.id,
        "Our pricing starts at ₹999/month. Would you like me to send you a detailed pricing sheet? 📊"
      );
    }
    
    if (content.includes('contact') || content.includes('call') || content.includes('phone')) {
      await this.sendMessage(
        conversation.id,
        "You can reach us at +91-XXXXXXXXXX or email support@samparkai.com 📞"
      );
    }
    
    if (content.includes('refund') || content.includes('cancel')) {
      await this.sendMessage(
        conversation.id,
        "I understand you'd like to discuss cancellation/refund. Let me connect you with our billing specialist. 🔄"
      );
    }
  }

  /**
   * Register message handler
   */
  onMessage(handler: (message: ChatMessage) => void): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  /**
   * Register conversation handler
   */
  onConversation(handler: (conversation: ChatConversation) => void): () => void {
    this.conversationHandlers.push(handler);
    return () => {
      this.conversationHandlers = this.conversationHandlers.filter(h => h !== handler);
    };
  }

  /**
   * Check connection status
   */
  isActive(): boolean {
    return this.isConnected;
  }

  /**
   * Disconnect from Crisp
   */
  disconnect(): void {
    if (this.client) {
      this.client.close();
      this.isConnected = false;
      console.log('🔌 Crisp disconnected');
    }
  }
}

// ============== FACTORY & SINGLETON ==============

let crispInstance: CrispService | null = null;

export function initCrisp(config: CrispConfig): CrispService {
  if (!crispInstance) {
    crispInstance = new CrispService(config);
  }
  return crispInstance;
}

export function getCrispService(): CrispService {
  if (!crispInstance) {
    throw new Error('Crisp not initialized. Call initCrisp first.');
  }
  return crispInstance;
}

// ============== WEBHOOK HANDLER ==============

export async function handleCrispWebhook(payload: CrispWebhookPayload): Promise<void> {
  console.log('📥 Crisp webhook received:', payload.type);
  
  switch (payload.type) {
    case 'message:created':
      // New message from customer
      break;
      
    case 'session:created':
      // New conversation started
      break;
      
    case 'session:resolved':
      // Conversation closed
      break;
      
    case 'user:email:verified':
      // Visitor email verified
      break;
      
    default:
      console.log('Unhandled webhook type:', payload.type);
  }
}

export default CrispService;