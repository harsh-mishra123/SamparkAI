// SMS/WhatsApp
/**
 * Twilio SMS & WhatsApp Integration
 * Handles SMS, WhatsApp messages, and voice calls
 */

import twilio from 'twilio';
import { Twilio } from 'twilio';

// ============== TYPES ==============

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  messagingServiceSid?: string;
  whatsappNumber?: string;
  smsNumber?: string;
}

export interface SMSMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  channel: 'sms' | 'whatsapp' | 'voice';
  status: 'queued' | 'sent' | 'delivered' | 'undelivered' | 'failed' | 'received';
  direction: 'inbound' | 'outbound';
  timestamp: Date;
  segments: number;
  price?: number;
  errorCode?: string;
  mediaUrls?: string[];
  conversationSid?: string;
  metadata: Record<string, any>;
}

export interface Conversation {
  id: string;
  customerNumber: string;
  customerName?: string;
  channel: 'sms' | 'whatsapp';
  messages: SMSMessage[];
  status: 'active' | 'resolved' | 'pending';
  assignedTo?: string;
  createdAt: Date;
  lastActivityAt: Date;
  unreadCount: number;
  tags: string[];
}

export interface TwilioWebhookPayload {
  MessageSid: string;
  SmsSid: string;
  AccountSid: string;
  MessagingServiceSid?: string;
  From: string;
  To: string;
  Body: string;
  NumMedia: string;
  MediaContentType0?: string;
  MediaUrl0?: string;
  SmsStatus: string;
  MessageStatus: string;
  ErrorCode?: string;
}

// ============== MAIN SERVICE ==============

export class TwilioService {
  private client: Twilio;
  private config: TwilioConfig;
  private conversations: Map<string, Conversation> = new Map();
  private messageHandlers: ((message: SMSMessage) => void)[] = [];
  private statusHandlers: ((messageId: string, status: string) => void)[] = [];

  constructor(config: TwilioConfig) {
    this.config = config;
    this.client = twilio(config.accountSid, config.authToken);
    console.log('✅ Twilio initialized');
  }

  // ============== SMS METHODS ==============

  /**
   * Send SMS message
   */
  async sendSMS(to: string, content: string, options?: {
    mediaUrl?: string[];
    statusCallback?: string;
  }): Promise<SMSMessage> {
    try {
      const message = await this.client.messages.create({
        body: content,
        to: this.formatPhoneNumber(to),
        from: this.config.smsNumber,
        messagingServiceSid: this.config.messagingServiceSid,
        mediaUrl: options?.mediaUrl,
        statusCallback: options?.statusCallback
      });

      const smsMessage: SMSMessage = {
        id: message.sid,
        from: message.from,
        to: message.to,
        content: message.body || '',
        channel: 'sms',
        status: this.mapTwilioStatus(message.status),
        direction: 'outbound',
        timestamp: new Date(),
        segments: message.numSegments ? parseInt(message.numSegments) : 1,
        price: message.price ? parseFloat(message.price) : undefined,
        errorCode: message.errorCode,
        mediaUrls: options?.mediaUrl,
        metadata: {}
      };

      // Update conversation
      await this.updateConversation(to, smsMessage);

      return smsMessage;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      throw error;
    }
  }

  /**
   * Send WhatsApp message
   */
  async sendWhatsApp(to: string, content: string, options?: {
    mediaUrl?: string[];
    template?: string;
    components?: any[];
  }): Promise<SMSMessage> {
    try {
      const from = `whatsapp:${this.config.whatsappNumber}`;
      const toNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${this.formatPhoneNumber(to)}`;

      let messageOptions: any = {
        body: content,
        to: toNumber,
        from: from,
        statusCallback: options?.statusCallback
      };

      // Use template if provided
      if (options?.template) {
        messageOptions = {
          ...messageOptions,
          contentSid: options.template,
          contentVariables: JSON.stringify(options.components)
        };
      }

      if (options?.mediaUrl) {
        messageOptions.mediaUrl = options.mediaUrl;
      }

      const message = await this.client.messages.create(messageOptions);

      const whatsappMessage: SMSMessage = {
        id: message.sid,
        from: message.from,
        to: message.to,
        content: message.body || '',
        channel: 'whatsapp',
        status: this.mapTwilioStatus(message.status),
        direction: 'outbound',
        timestamp: new Date(),
        segments: message.numSegments ? parseInt(message.numSegments) : 1,
        price: message.price ? parseFloat(message.price) : undefined,
        errorCode: message.errorCode,
        mediaUrls: options?.mediaUrl,
        metadata: {}
      };

      await this.updateConversation(to, whatsappMessage);
      return whatsappMessage;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  /**
   * Handle incoming message (webhook)
   */
  async handleIncomingMessage(payload: TwilioWebhookPayload): Promise<SMSMessage> {
    try {
      const message: SMSMessage = {
        id: payload.MessageSid || payload.SmsSid,
        from: payload.From,
        to: payload.To,
        content: payload.Body || '',
        channel: payload.From.startsWith('whatsapp:') ? 'whatsapp' : 'sms',
        status: 'received',
        direction: 'inbound',
        timestamp: new Date(),
        segments: 1,
        errorCode: payload.ErrorCode,
        mediaUrls: this.extractMediaUrls(payload),
        metadata: {}
      };

      // Update conversation
      await this.updateConversation(message.from, message);

      // Notify handlers
      this.messageHandlers.forEach(handler => handler(message));

      // Auto-respond if configured
      await this.checkAutoResponse(message);

      return message;
    } catch (error) {
      console.error('Failed to handle incoming message:', error);
      throw error;
    }
  }

  /**
   * Send proactive alert via SMS
   */
  async sendProactiveAlert(
    customerNumber: string,
    alertType: 'critical' | 'warning' | 'info',
    title: string,
    description: string,
    actionUrl?: string
  ): Promise<SMSMessage> {
    let content = '';
    
    switch (alertType) {
      case 'critical':
        content = `🔴 URGENT: ${title}\n${description}\n`;
        break;
      case 'warning':
        content = `🟡 Important: ${title}\n${description}\n`;
        break;
      case 'info':
        content = `🔵 Update: ${title}\n${description}\n`;
        break;
    }

    if (actionUrl) {
      content += `\nView details: ${actionUrl}`;
    }

    return this.sendSMS(customerNumber, content);
  }

  /**
   * Send bulk notifications
   */
  async sendBulkSMS(
    recipients: string[],
    content: string,
    options?: {
      personalized?: boolean;
      batchSize?: number;
    }
  ): Promise<{ success: string[]; failed: string[] }> {
    const batchSize = options?.batchSize || 100;
    const success: string[] = [];
    const failed: string[] = [];

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      const promises = batch.map(async (recipient) => {
        try {
          let messageContent = content;
          
          // Personalize if needed
          if (options?.personalized) {
            messageContent = content.replace('{{name}}', recipient);
          }
          
          await this.sendSMS(recipient, messageContent);
          success.push(recipient);
        } catch (error) {
          console.error(`Failed to send to ${recipient}:`, error);
          failed.push(recipient);
        }
      });

      await Promise.all(promises);
      
      // Rate limiting delay
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return { success, failed };
  }

  /**
   * Send OTP/Verification code
   */
  async sendOTP(phoneNumber: string): Promise<{
    success: boolean;
    code: string;
    messageId: string;
  }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const message = await this.sendSMS(
      phoneNumber,
      `Your SamparkAI verification code is: ${otp}\nValid for 10 minutes.`
    );

    return {
      success: true,
      code: otp,
      messageId: message.id
    };
  }

  /**
   * Verify OTP
   */
  verifyOTP(providedCode: string, storedCode: string): boolean {
    return providedCode === storedCode;
  }

  /**
   * Get conversation history
   */
  async getConversation(customerNumber: string): Promise<Conversation | null> {
    return this.conversations.get(customerNumber) || null;
  }

  /**
   * Update or create conversation
   */
  private async updateConversation(
    customerNumber: string,
    message: SMSMessage
  ): Promise<Conversation> {
    let conversation = this.conversations.get(customerNumber);

    if (!conversation) {
      conversation = {
        id: `conv_${Date.now()}`,
        customerNumber,
        channel: message.channel,
        messages: [],
        status: 'active',
        createdAt: new Date(),
        lastActivityAt: new Date(),
        unreadCount: 0,
        tags: []
      };
    }

    conversation.messages.push(message);
    conversation.lastActivityAt = new Date();
    
    if (message.direction === 'inbound') {
      conversation.unreadCount += 1;
    } else {
      conversation.unreadCount = 0;
    }

    this.conversations.set(customerNumber, conversation);
    return conversation;
  }

  /**
   * Mark conversation as read
   */
  async markAsRead(customerNumber: string): Promise<void> {
    const conversation = this.conversations.get(customerNumber);
    if (conversation) {
      conversation.unreadCount = 0;
      this.conversations.set(customerNumber, conversation);
    }
  }

  /**
   * Resolve conversation
   */
  async resolveConversation(customerNumber: string): Promise<void> {
    const conversation = this.conversations.get(customerNumber);
    if (conversation) {
      conversation.status = 'resolved';
      this.conversations.set(customerNumber, conversation);
    }
  }

  /**
   * Get all active conversations
   */
  getActiveConversations(): Conversation[] {
    return Array.from(this.conversations.values())
      .filter(c => c.status === 'active')
      .sort((a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime());
  }

  /**
   * Send delivery status update
   */
  async handleStatusCallback(payload: any): Promise<void> {
    const { MessageSid, MessageStatus, ErrorCode } = payload;
    
    // Find and update message status
    for (const conv of this.conversations.values()) {
      const message = conv.messages.find(m => m.id === MessageSid);
      if (message) {
        message.status = this.mapTwilioStatus(MessageStatus);
        message.errorCode = ErrorCode;
        break;
      }
    }

    this.statusHandlers.forEach(handler => handler(MessageSid, MessageStatus));
  }

  /**
   * Check for auto-response rules
   */
  private async checkAutoResponse(message: SMSMessage): Promise<void> {
    const content = message.content.toLowerCase();

    if (content.includes('help') || content.includes('support')) {
      await this.sendSMS(
        message.from,
        "👋 Thanks for reaching out! An agent will respond shortly.\n\n" +
        "For immediate help, visit: https://support.samparkai.com"
      );
    }

    if (content.includes('stop') || content.includes('unsubscribe')) {
      await this.sendSMS(
        message.from,
        "You've been unsubscribed from SMS notifications. Reply START to re-subscribe."
      );
      // Add to opt-out list
    }

    if (content.includes('balance') || content.includes('due')) {
      await this.sendSMS(
        message.from,
        "💰 To check your balance, please login to your dashboard: https://app.samparkai.com/billing"
      );
    }
  }

  /**
   * Format phone number to E.164
   */
  private formatPhoneNumber(number: string): string {
    // Remove all non-digits
    let cleaned = number.replace(/\D/g, '');
    
    // Add +91 for India if not present
    if (cleaned.length === 10) {
      cleaned = `+91${cleaned}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
      cleaned = `+${cleaned}`;
    } else if (!cleaned.startsWith('+')) {
      cleaned = `+${cleaned}`;
    }
    
    return cleaned;
  }

  /**
   * Extract media URLs from webhook
   */
  private extractMediaUrls(payload: TwilioWebhookPayload): string[] {
    const urls: string[] = [];
    const numMedia = parseInt(payload.NumMedia || '0');
    
    for (let i = 0; i < numMedia; i++) {
      const url = payload[`MediaUrl${i}` as keyof TwilioWebhookPayload];
      if (url && typeof url === 'string') {
        urls.push(url);
      }
    }
    
    return urls;
  }

  /**
   * Map Twilio status to internal status
   */
  private mapTwilioStatus(status: string): SMSMessage['status'] {
    const statusMap: Record<string, SMSMessage['status']> = {
      'queued': 'queued',
      'sent': 'sent',
      'delivered': 'delivered',
      'undelivered': 'undelivered',
      'failed': 'failed',
      'received': 'received',
      'read': 'delivered'
    };
    
    return statusMap[status] || 'sent';
  }

  /**
   * Register message handler
   */
  onMessage(handler: (message: SMSMessage) => void): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  /**
   * Register status handler
   */
  onStatus(handler: (messageId: string, status: string) => void): () => void {
    this.statusHandlers.push(handler);
    return () => {
      this.statusHandlers = this.statusHandlers.filter(h => h !== handler);
    };
  }

  /**
   * Check service health
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.api.accounts(this.config.accountSid).fetch();
      return true;
    } catch {
      return false;
    }
  }
}

// ============== FACTORY & SINGLETON ==============

let twilioInstance: TwilioService | null = null;

export function initTwilio(config: TwilioConfig): TwilioService {
  if (!twilioInstance) {
    twilioInstance = new TwilioService(config);
  }
  return twilioInstance;
}

export function getTwilioService(): TwilioService {
  if (!twilioInstance) {
    throw new Error('Twilio not initialized. Call initTwilio first.');
  }
  return twilioInstance;
}

// ============== WEBHOOK HANDLER ==============

export async function handleTwilioWebhook(payload: TwilioWebhookPayload): Promise<SMSMessage> {
  const service = getTwilioService();
  return service.handleIncomingMessage(payload);
}

export default TwilioService;