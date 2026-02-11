// Email templates
/**
 * Email Templates Module
 * Contains all email templates for SamparkAI
 */

export interface TemplateData {
  [key: string]: any;
}

export interface EmailTemplate {
  name: string;
  subject: (data: TemplateData) => string;
  html: (data: TemplateData) => string;
  text?: (data: TemplateData) => string;
  category: 'transactional' | 'notification' | 'proactive' | 'marketing';
  tags?: string[];
}

/**
 * Base template wrapper for consistent styling
 */
export function baseTemplate(content: string, options?: {
  title?: string;
  preheader?: string;
  cta?: { text: string; url: string };
  footer?: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${options?.title || 'SamparkAI'}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            padding: 30px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            margin: 20px 0;
        }
        .card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
        }
        .highlight {
            background: #fff3cd;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #ffeaa7;
            margin: 20px 0;
        }
        @media (max-width: 600px) {
            .container {
                border-radius: 0;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SamparkAI</div>
            <h1>${options?.title || 'Intelligent Customer Engagement'}</h1>
        </div>
        <div class="content">
            ${content}
            ${options?.cta ? `
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${options.cta.url}" class="button">${options.cta.text}</a>
                </div>
            ` : ''}
        </div>
        <div class="footer">
            ${options?.footer || `
                <p>&copy; ${new Date().getFullYear()} SamparkAI. All rights reserved.</p>
                <p>Made with ❤️ in India | प्रगति के लिए प्रौद्योगिकी</p>
                <p>
                    <a href="https://samparkai.com" style="color: #667eea;">Website</a> | 
                    <a href="https://support.samparkai.com" style="color: #667eea;">Support</a> | 
                    <a href="https://twitter.com/SamparkAI" style="color: #667eea;">Twitter</a>
                </p>
            `}
        </div>
    </div>
</body>
</html>
  `.trim();
}

/**
 * Collection of all email templates
 */
export const emailTemplates: Record<string, EmailTemplate> = {
  // Welcome Template
  welcome: {
    name: 'welcome',
    category: 'transactional',
    subject: (data) => `Welcome to SamparkAI, ${data.name}!`,
    html: (data) => baseTemplate(`
      <h2>Welcome aboard! 👋</h2>
      <p>Hi <strong>${data.name}</strong>,</p>
      <p>We're thrilled to have you join SamparkAI. Our intelligent customer engagement platform is designed to help you transform reactive support into proactive customer success.</p>
      
      <div class="card">
        <h3>Getting Started:</h3>
        <ol>
          <li>Connect your support channels (Email, Chat, Social)</li>
          <li>Set up your AI models for proactive detection</li>
          <li>Configure your team and workflows</li>
          <li>Start engaging with intelligent insights!</li>
        </ol>
      </div>
      
      <div class="highlight">
        <p><strong>Pro Tip:</strong> Enable proactive detection in settings to start identifying customer issues before they're reported.</p>
      </div>
      
      <p>Need help getting started? Check out our <a href="https://docs.samparkai.com">documentation</a> or schedule a <a href="https://cal.samparkai.com/onboarding">onboarding call</a>.</p>
      
      <p>Best regards,<br>The SamparkAI Team</p>
    `, {
      title: 'Welcome to SamparkAI',
      cta: {
        text: 'Go to Dashboard',
        url: 'https://app.samparkai.com/dashboard'
      }
    }),
    text: (data) => `
Welcome to SamparkAI, ${data.name}!

We're thrilled to have you join SamparkAI. Our intelligent customer engagement platform is designed to help you transform reactive support into proactive customer success.

Getting Started:
1. Connect your support channels (Email, Chat, Social)
2. Set up your AI models for proactive detection
3. Configure your team and workflows
4. Start engaging with intelligent insights!

Pro Tip: Enable proactive detection in settings to start identifying customer issues before they're reported.

Need help? Check out our documentation: https://docs.samparkai.com
Schedule onboarding: https://cal.samparkai.com/onboarding

Best regards,
The SamparkAI Team
    `.trim()
  },

  // Ticket Created Template
  ticket_created: {
    name: 'ticket_created',
    category: 'notification',
    subject: (data) => `Ticket Created: ${data.subject}`,
    html: (data) => baseTemplate(`
      <h2>New Support Ticket Created 🎫</h2>
      <p>Hi <strong>${data.customerName}</strong>,</p>
      <p>We've received your support request and our team is on it.</p>
      
      <div class="card">
        <h3>Ticket Details:</h3>
        <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Priority:</strong> <span style="color: ${data.priority === 'high' ? '#dc3545' : data.priority === 'medium' ? '#ffc107' : '#28a745'}">${data.priority}</span></p>
        <p><strong>Status:</strong> ${data.status}</p>
        ${data.category ? `<p><strong>Category:</strong> ${data.category}</p>` : ''}
      </div>
      
      <p><strong>Your message:</strong></p>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
        ${data.message}
      </div>
      
      <p>You can track the progress of your ticket at any time using the link below.</p>
      
      <p>We'll get back to you as soon as possible.</p>
      
      <p>Best regards,<br>The SamparkAI Support Team</p>
    `, {
      title: 'Support Ticket Created',
      cta: {
        text: 'View Ticket',
        url: `https://app.samparkai.com/tickets/${data.ticketId}`
      }
    })
  },

  // Proactive Issue Resolution Template
  proactive_issue_resolved: {
    name: 'proactive_issue_resolved',
    category: 'proactive',
    subject: (data) => `✅ Issue Resolved: ${data.issueTitle}`,
    html: (data) => baseTemplate(`
      <h2>Great news! 🎉</h2>
      <p>Hi <strong>${data.customerName}</strong>,</p>
      
      <div class="highlight">
        <p style="font-size: 18px; margin: 0;">We've proactively resolved an issue you were experiencing.</p>
      </div>
      
      <div class="card">
        <h3>Issue Details:</h3>
        <p><strong>Issue:</strong> ${data.issueTitle}</p>
        <p><strong>Detected:</strong> ${data.detectedAt}</p>
        <p><strong>Resolved:</strong> ${data.resolvedAt}</p>
        <p><strong>Resolution:</strong> ${data.resolution}</p>
      </div>
      
      <p>Our AI system detected this issue based on your usage patterns and automatically applied the fix.</p>
      
      <div style="background: #e8f5e9; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p><strong>💡 Did you know?</strong> This is part of our proactive support system that prevents issues before they affect your experience.</p>
      </div>
      
      <p>If you're still experiencing any problems, please let us know by replying to this email.</p>
      
      <p>Happy using!<br>Your SamparkAI Proactive Support Team</p>
    `, {
      title: 'Issue Proactively Resolved',
      cta: {
        text: 'Learn About Proactive Support',
        url: 'https://samparkai.com/proactive-support'
      }
    })
  },

  // Weekly Digest Template
  weekly_digest: {
    name: 'weekly_digest',
    category: 'notification',
    subject: (data) => `Your SamparkAI Weekly Digest - ${data.weekOf}`,
    html: (data) => baseTemplate(`
      <h2>Your Weekly Support Digest 📊</h2>
      <p>Hi <strong>${data.customerName}</strong>,</p>
      <p>Here's a summary of your support activity for the week of ${data.weekOf}:</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0;">
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #1976d2;">${data.ticketsCreated}</div>
          <div>Tickets Created</div>
        </div>
        <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #7b1fa2;">${data.ticketsResolved}</div>
          <div>Tickets Resolved</div>
        </div>
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #388e3c;">${data.proactiveIssues}</div>
          <div>Proactive Fixes</div>
        </div>
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #f57c00;">${data.responseTime}</div>
          <div>Avg. Response Time</div>
        </div>
      </div>
      
      ${data.topIssues?.length ? `
        <div class="card">
          <h3>Top Issues This Week:</h3>
          <ul>
            ${data.topIssues.map((issue: string) => `<li>${issue}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${data.proactiveInsights?.length ? `
        <div class="highlight">
          <h3>🔮 Proactive Insights:</h3>
          <ul>
            ${data.proactiveInsights.map((insight: string) => `<li>${insight}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      <p>Keep up the great engagement! Our AI continues to learn from your usage to provide even better proactive support.</p>
      
      <p>Have a great week ahead!<br>The SamparkAI Team</p>
    `, {
      title: 'Weekly Support Digest',
      cta: {
        text: 'View Detailed Analytics',
        url: 'https://app.samparkai.com/analytics'
      }
    })
  },

  // Agent Assignment Template (Internal)
  agent_assignment: {
    name: 'agent_assignment',
    category: 'notification',
    tags: ['internal'],
    subject: (data) => `New Ticket Assigned: ${data.ticketId}`,
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; }
              .ticket-info { background: #f5f5f5; padding: 15px; border-radius: 5px; }
              .urgency-high { color: #dc3545; font-weight: bold; }
          </style>
      </head>
      <body>
          <h2>New Ticket Assignment</h2>
          <p>Hello <strong>${data.agentName}</strong>,</p>
          <p>A new ticket has been assigned to you.</p>
          
          <div class="ticket-info">
              <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
              <p><strong>Customer:</strong> ${data.customerName}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Priority:</strong> <span class="${data.priority === 'high' ? 'urgency-high' : ''}">${data.priority}</span></p>
              <p><strong>Category:</strong> ${data.category}</p>
              <p><strong>AI Prediction:</strong> ${data.predictedIntent} (${data.confidence}% confidence)</p>
          </div>
          
          <p><a href="https://app.samparkai.com/agent/tickets/${data.ticketId}">Click here to view the ticket</a></p>
          
          <p><small>This is an automated notification from SamparkAI Agent System</small></p>
      </body>
      </html>
    `.trim()
  }
};

/**
 * Template manager class
 */
export class TemplateManager {
  private templates: Record<string, EmailTemplate>;

  constructor(customTemplates?: Record<string, EmailTemplate>) {
    this.templates = { ...emailTemplates, ...customTemplates };
  }

  /**
   * Get template by name
   */
  getTemplate(name: string): EmailTemplate | null {
    return this.templates[name] || null;
  }

  /**
   * Render template with data
   */
  renderTemplate(name: string, data: TemplateData): {
    subject: string;
    html: string;
    text?: string;
  } {
    const template = this.getTemplate(name);
    if (!template) {
      throw new Error(`Template "${name}" not found`);
    }

    return {
      subject: template.subject(data),
      html: template.html(data),
      text: template.text?.(data)
    };
  }

  /**
   * Add or update template
   */
  registerTemplate(template: EmailTemplate): void {
    this.templates[template.name] = template;
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: string): EmailTemplate[] {
    return Object.values(this.templates).filter(t => t.category === category);
  }

  /**
   * List all available templates
   */
  listTemplates(): string[] {
    return Object.keys(this.templates);
  }

  /**
   * Create custom template
   */
  createCustomTemplate(
    name: string,
    subjectFn: (data: TemplateData) => string,
    htmlFn: (data: TemplateData) => string,
    options?: {
      textFn?: (data: TemplateData) => string;
      category?: string;
      tags?: string[];
    }
  ): EmailTemplate {
 const template: EmailTemplate = {
  name,
  subject: subjectFn,
  html: htmlFn,
  text: options?.textFn,
  category: this.validateCategory(options?.category) || 'transactional',
  tags: options?.tags
};

this.registerTemplate(template);
return template;
    this.registerTemplate(template);
    return template;
  }
}

// Export singleton instance
export const templateManager = new TemplateManager();

// Utility function for quick template rendering
export function render(templateName: string, data: TemplateData) {
  return templateManager.renderTemplate(templateName, data);
}