/**
 * Integrations Module - Main Export File
 * This file exports all integration services
 */

// Export Crisp
export * from './crisp';
export { CrispService, initCrisp, getCrispService } from './crisp';

// Export Twilio  
export * from './twilio';
export { TwilioService, initTwilio, getTwilioService } from './twilio';

// Export Social
export * from './social';
export { SocialMediaService } from './social';

// Unified Integration Manager
export class IntegrationManager {
  private static instance: IntegrationManager;
  
  private constructor() {}
  
  static getInstance(): IntegrationManager {
    if (!IntegrationManager.instance) {
      IntegrationManager.instance = new IntegrationManager();
    }
    return IntegrationManager.instance;
  }

  async checkAllHealth(): Promise<Record<string, boolean>> {
    return {
      crisp: await this.checkCrispHealth(),
      twilio: await this.checkTwilioHealth(),
      social: await this.checkSocialHealth()
    };
  }

  private async checkCrispHealth(): Promise<boolean> {
    try {
      const crisp = getCrispService();
      return crisp.isActive();
    } catch {
      return false;
    }
  }

  private async checkTwilioHealth(): Promise<boolean> {
    try {
      const twilio = getTwilioService();
      return twilio.healthCheck();
    } catch {
      return false;
    }
  }

  private async checkSocialHealth(): Promise<boolean> {
    try {
      const social = getSocialService();
      return social.isConnected();
    } catch {
      return false;
    }
  }
}