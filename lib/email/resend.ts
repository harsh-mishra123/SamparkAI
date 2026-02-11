// Resend client
/**
 * Resend Email Service Integration
 * Handles sending transactional emails via Resend.com
 */

import { Resend } from 'resend';

export interface EmailOptions {
  from: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: Attachment[];
  tags?: Tag[];
  headers?: Record<string, string>;
}

export interface Attachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface Tag {
  name: string;
  value: string;
}

export interface SendResponse {
  id: string;
  message?: string;
  success: boolean;
  error?: string;
}

export class ResendService {
  private resend: Resend;
  private defaultFrom: string;
  private defaultReplyTo?: string;

  constructor(apiKey: string, options?: { defaultFrom?: string; defaultReplyTo?: string }) {
    this.resend = new Resend(apiKey);
    this.defaultFrom = options?.defaultFrom || 'SamparkAI <support@samparkai.com>';
    this.defaultReplyTo = options?.defaultReplyTo;
  }

  /**
   * Send a transactional email
   */
  async sendEmail(options: EmailOptions): Promise<SendResponse> {
    try {
      const emailOptions = this.prepareEmailOptions(options);
      
      const response = await this.resend.emails.send(emailOptions);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return {
        id: response.data?.id || `local_${Date.now()}`,
        message: 'Email sent successfully',
        success: true
      };
    } catch (error) {
      console.error('Failed to send email:', error);
      return {
        id: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Send email with template
   */
/**
 * Send email with template
 */
async sendTemplate(
  templateName: string,
  to: string | string[],
  templateData: Record<string, any>,
  options?: Partial<EmailOptions>
): Promise<SendResponse> {
  // TODO: Integrate with template engine
  // This should fetch template, merge data, and send
  
  const html = this.renderTemplate(templateName, templateData);
  
  return this.sendEmail({
    from: options?.from || this.defaultFrom,  // Add 'from' with default
    to: to,
    subject: options?.subject || 'Message from SamparkAI',
    html: html,
    cc: options?.cc,
    bcc: options?.bcc,
    replyTo: options?.replyTo,
    attachments: options?.attachments,
    tags: options?.tags,
    headers: options?.headers
  });
}
  /**
   * Send batch emails
   */
  async sendBatch(emails: EmailOptions[]): Promise<SendResponse[]> {
    const promises = emails.map(email => this.sendEmail(email));
    return Promise.all(promises);
  }

  /**
   * Send automated reply with threading
   */
 /**
 * Send automated reply with threading
 */
async sendAutoReply(
  originalEmailId: string,
  to: string,
  content: string,
  options?: Partial<EmailOptions>
): Promise<SendResponse> {
  return this.sendEmail({
    from: options?.from || this.defaultFrom,  // Fix: Ensure 'from' is always a string
    to: to,
    subject: options?.subject || 'Re: Your support request',
    html: this.wrapInReplyTemplate(content),
    cc: options?.cc,
    bcc: options?.bcc,
    replyTo: options?.replyTo,
    attachments: options?.attachments,
    tags: options?.tags,
    headers: {
      ...options?.headers,
      'In-Reply-To': originalEmailId,
      'References': originalEmailId
    }
  });
}
  /**
   * Send proactive notification
   */
  async sendProactiveNotification(
    customerEmail: string,
    notificationType: 'issue_resolved' | 'tip' | 'update' | 'check_in',
    data: Record<string, any>
  ): Promise<SendResponse> {
    const templates = {
      issue_resolved: {
        subject: 'Issue Resolved: ${issueTitle}',
        template: 'proactive_issue_resolved'
      },
      tip: {
        subject: 'Tip: ${tipTitle}',
        template: 'proactive_tip'
      },
      update: {
        subject: 'Update: ${updateTitle}',
        template: 'proactive_update'
      },
      check_in: {
        subject: 'Checking in on your experience',
        template: 'proactive_check_in'
      }
    };

    const template = templates[notificationType];

    return this.sendTemplate(
      template.template,
      customerEmail,
      { ...data, notificationType },
      {
        subject: this.renderString(template.subject, data)
      }
    );
  }

  /**
   * Prepare email options with defaults
   */
  private prepareEmailOptions(options: EmailOptions): any {
    return {
      from: options.from || this.defaultFrom,
      to: Array.isArray(options.to) ? options.to : [options.to],
      cc: options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]) : undefined,
      bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc : [options.bcc]) : undefined,
      reply_to: options.replyTo || this.defaultReplyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments?.map(att => ({
        filename: att.filename,
        content: att.content instanceof Buffer ? att.content.toString('base64') : att.content,
        content_type: att.contentType
      })),
      tags: options.tags,
      headers: options.headers
    };
  }

  /**
   * Render template with data
   */
  private renderTemplate(templateName: string, data: Record<string, any>): string {
    // TODO: Integrate with proper template engine like Handlebars, EJS, or React email
    // For now, using simple string replacement
    
    const templates: Record<string, string> = {
      welcome: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to SamparkAI, ${data.name}!</h1>
          <p>We're excited to have you on board.</p>
        </div>
      `,
      ticket_created: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Support Ticket Created</h2>
          <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p>We'll get back to you soon.</p>
        </div>
      `,
      proactive_issue_resolved: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your issue has been resolved!</h2>
          <p>We noticed that the issue you were experiencing with <strong>${data.issueTitle}</strong> has been resolved.</p>
          <p>If you're still facing any problems, please let us know.</p>
        </div>
      `
    };

    const template = templates[templateName] || templates.welcome;
    return this.renderString(template, data);
  }

  /**
   * Simple string template rendering
   */
  private renderString(template: string, data: Record<string, any>): string {
    return template.replace(/\${([^}]+)}/g, (_, key) => data[key] || '');
  }

  /**
   * Wrap content in reply template
   */
  private wrapInReplyTemplate(content: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          ${content}
        </div>
        <div style="color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 10px;">
          <p>This is an automated message from SamparkAI. Please do not reply to this email.</p>
          <p>Need help? Visit our <a href="https://support.samparkai.com">support portal</a>.</p>
        </div>
      </div>
    `;
  }

  /**
   * Validate email before sending
   */
  validateEmailOptions(options: EmailOptions): string[] {
    const errors: string[] = [];

    if (!options.to) {
      errors.push('Recipient (to) is required');
    }

    if (!options.subject) {
      errors.push('Subject is required');
    }

    if (!options.html && !options.text) {
      errors.push('Either html or text content is required');
    }

    return errors;
  }
}

// Singleton instance export
let resendServiceInstance: ResendService | null = null;

export function initResendService(apiKey: string, options?: any): ResendService {
  if (!resendServiceInstance) {
    resendServiceInstance = new ResendService(apiKey, options);
  }
  return resendServiceInstance;
}

export function getResendService(): ResendService {
  if (!resendServiceInstance) {
    throw new Error('ResendService not initialized. Call initResendService first.');
  }
  return resendServiceInstance;
}