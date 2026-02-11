// Email parsing
/**
 * Email Parser Module
 * Handles parsing, validation, and extraction of email content
 */

export interface ParsedEmail {
  id: string;
  from: EmailAddress;
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  subject: string;
  body: {
    html: string;
    text: string;
    stripped?: string;
  };
  attachments?: EmailAttachment[];
  headers: Record<string, string>;
  receivedAt: Date;
  threadId?: string;
  inReplyTo?: string;
  references?: string[];
}

export interface EmailAddress {
  name?: string;
  address: string;
}

export interface EmailAttachment {
  filename: string;
  contentType: string;
  content: Buffer;
  size: number;
  contentId?: string;
}

export class EmailParser {
  /**
   * Parse raw email content (MIME format)
   */
  static parseRawEmail(rawEmail: string | Buffer): ParsedEmail {
    // TODO: Implement MIME parsing
    // Consider using libraries like 'mailparser' or 'mime'
    
    const parsed: ParsedEmail = {
      id: this.generateEmailId(),
      from: { address: '', name: '' },
      to: [],
      subject: '',
      body: { html: '', text: '' },
      headers: {},
      receivedAt: new Date()
    };

    // Parse headers
    const lines = rawEmail.toString().split('\n');
    for (const line of lines) {
      if (line.trim() === '') break; // End of headers
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        parsed.headers[key.toLowerCase()] = value.trim();
      }
    }

    // Extract basic fields from headers
    parsed.from = this.parseEmailAddress(parsed.headers['from'] || '');
    parsed.to = this.parseEmailAddresses(parsed.headers['to'] || '');
    parsed.subject = parsed.headers['subject'] || '(No Subject)';
    parsed.threadId = parsed.headers['message-id'] || this.generateThreadId();

    // Parse body content
    // This is a simplified version - implement proper MIME parsing
 // Replace line 77
const bodyMatch = rawEmail.toString().match(/\n\n([\s\S]*)/);
    if (bodyMatch) {
      parsed.body.text = bodyMatch[1].trim();
    }

    return parsed;
  }

  /**
   * Parse email address string into EmailAddress object
   * Example: "John Doe <john@example.com>" -> { name: "John Doe", address: "john@example.com" }
   */
  static parseEmailAddress(addressStr: string): EmailAddress {
    const match = addressStr.match(/(?:"([^"]+)"\s*)?<?([^>\s]+@[^>\s]+)>?/);
    if (match) {
      const [, name, address] = match;
      return {
        name: name?.trim() || address.split('@')[0],
        address: address.toLowerCase().trim()
      };
    }
    return { address: addressStr.trim() };
  }

  /**
   * Parse multiple email addresses
   */
  static parseEmailAddresses(addressesStr: string): EmailAddress[] {
    return addressesStr
      .split(',')
      .map(addr => this.parseEmailAddress(addr))
      .filter(addr => addr.address.includes('@'));
  }

  /**
   * Extract actionable content from email body
   */
  static extractActionableContent(body: string): {
    intent: string;
    entities: Record<string, string[]>;
    urgency: 'low' | 'medium' | 'high';
    categories: string[];
  } {
    // TODO: Implement NLP-based content extraction
    // Integrate with AI service for intent classification
    
    const lowercaseBody = body.toLowerCase();
    
    const categories: string[] = [];
    if (lowercaseBody.includes('refund') || lowercaseBody.includes('money back')) {
      categories.push('refund');
    }
    if (lowercaseBody.includes('bug') || lowercaseBody.includes('not working')) {
      categories.push('bug');
    }
    if (lowercaseBody.includes('feature request') || lowercaseBody.includes('suggest')) {
      categories.push('feature_request');
    }

    return {
      intent: this.detectIntent(body),
      entities: this.extractEntities(body),
      urgency: this.detectUrgency(body),
      categories
    };
  }

  /**
   * Detect intent from email content
   */
  private static detectIntent(body: string): string {
    const bodyLower = body.toLowerCase();
    
    if (bodyLower.includes('help') || bodyLower.includes('support')) return 'help_request';
    if (bodyLower.includes('cancel') || bodyLower.includes('terminate')) return 'cancellation';
    if (bodyLower.includes('complaint') || bodyLower.includes('angry')) return 'complaint';
    if (bodyLower.includes('thank') || bodyLower.includes('appreciate')) return 'appreciation';
    
    return 'general_inquiry';
  }

  /**
   * Extract entities (dates, products, versions, etc.)
   */
  private static extractEntities(body: string): Record<string, string[]> {
    const entities: Record<string, string[]> = {
      dates: [],
      products: [],
      versions: [],
      urls: [],
      phone_numbers: []
    };

    // Extract dates (simplified regex)
    const dateRegex = /\b(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2})\b/g;
    entities.dates = (body.match(dateRegex) || []);

    // Extract URLs
    const urlRegex = /https?:\/\/[^\s]+/g;
    entities.urls = (body.match(urlRegex) || []);

    // Extract phone numbers (basic pattern)
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
    entities.phone_numbers = (body.match(phoneRegex) || []);

    return entities;
  }

  /**
   * Detect urgency level
   */
  private static detectUrgency(body: string): 'low' | 'medium' | 'high' {
    const bodyLower = body.toLowerCase();
    const urgentWords = ['urgent', 'asap', 'immediately', 'emergency', 'critical'];
    const mediumWords = ['soon', 'important', 'need help', 'please respond'];

    if (urgentWords.some(word => bodyLower.includes(word))) return 'high';
    if (mediumWords.some(word => bodyLower.includes(word))) return 'medium';
    return 'low';
  }

  /**
   * Generate unique email ID
   */
  private static generateEmailId(): string {
    return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate thread ID for email grouping
   */
  private static generateThreadId(): string {
    return `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate email address format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Extract email domain
   */
  static extractDomain(email: string): string {
    return email.split('@')[1] || '';
  }

  /**
   * Check if email is from internal domain
   */
  static isInternalEmail(email: string, internalDomains: string[]): boolean {
    const domain = this.extractDomain(email);
    return internalDomains.includes(domain);
  }
}

// Export utility functions
export const parseEmail = EmailParser.parseRawEmail;
export const extractContent = EmailParser.extractActionableContent;
export const isValidEmail = EmailParser.isValidEmail;