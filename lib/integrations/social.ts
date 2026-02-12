// Social media APIs
/**
 * Social Media Integration
 * Handles Twitter, Facebook, Instagram, LinkedIn
 */

import Twitter from 'twitter-api-v2';
import Facebook from 'fb';
import Instagram from 'instagram-private-api';

// ============== TYPES ==============

export interface SocialConfig {
  twitter?: {
    appKey: string;
    appSecret: string;
    accessToken: string;
    accessSecret: string;
  };
  facebook?: {
    appId: string;
    appSecret: string;
    pageId: string;
    accessToken: string;
  };
  instagram?: {
    username: string;
    password: string;
    businessId?: string;
  };
  linkedin?: {
    clientId: string;
    clientSecret: string;
    accessToken: string;
    organizationId: string;
  };
}

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  type: 'tweet' | 'post' | 'comment' | 'dm' | 'mention' | 'story';
  content: string;
  author: {
    id: string;
    username: string;
    name: string;
    avatar?: string;
    verified?: boolean;
    followers?: number;
  };
  timestamp: Date;
  url?: string;
  mediaUrls?: string[];
  metrics?: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
  };
  sentiment?: 'positive' | 'neutral' | 'negative';
  urgency?: 'low' | 'medium' | 'high';
  metadata: Record<string, any>;
}

export interface SocialConversation {
  id: string;
  platform: string;
  participants: SocialPost['author'][];
  messages: SocialPost[];
  status: 'active' | 'resolved' | 'pending';
  assignedTo?: string;
  createdAt: Date;
  lastActivityAt: Date;
  tags: string[];
}

export interface SocialMention {
  id: string;
  platform: string;
  author: SocialPost['author'];
  content: string;
  timestamp: Date;
  url: string;
  engagement: {
    likes: number;
    retweets?: number;
    shares?: number;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
  reach: number;
}

// ============== MAIN SERVICE ==============

export class SocialMediaService {
  private config: SocialConfig;
  private twitterClient: any;
  private facebookClient: any;
  private instagramClient: any;
  private linkedinClient: any;
  
  private conversations: Map<string, SocialConversation> = new Map();
  private mentionHandlers: ((mention: SocialMention) => void)[] = [];
  private messageHandlers: ((message: SocialPost) => void)[] = [];

  constructor(config: SocialConfig) {
    this.config = config;
    this.initializeClients();
  }

  /**
   * Initialize platform clients
   */
  private initializeClients(): void {
    // Twitter
    if (this.config.twitter) {
      this.twitterClient = new Twitter({
        appKey: this.config.twitter.appKey,
        appSecret: this.config.twitter.appSecret,
        accessToken: this.config.twitter.accessToken,
        accessSecret: this.config.twitter.accessSecret,
      });
      console.log('✅ Twitter client initialized');
      this.startTwitterStream();
    }

    // Facebook
    if (this.config.facebook) {
      Facebook.setAccessToken(this.config.facebook.accessToken);
      this.facebookClient = Facebook;
      console.log('✅ Facebook client initialized');
      this.startFacebookMonitoring();
    }

    // Instagram
    if (this.config.instagram) {
      this.initializeInstagram();
    }

    // LinkedIn
    if (this.config.linkedin) {
      this.initializeLinkedIn();
    }
  }

  // ============== TWITTER METHODS ==============

  /**
   * Start Twitter stream for mentions
   */
  private async startTwitterStream(): Promise<void> {
    try {
      const stream = await this.twitterClient.v1.stream('statuses/filter', {
        track: '@SamparkAI,@SamparkSupport',
      });

      stream.on('data', (tweet: any) => {
        this.handleTwitterMention(tweet);
      });

      stream.on('error', (error: Error) => {
        console.error('Twitter stream error:', error);
      });

      console.log('🎧 Twitter stream listening for mentions');
    } catch (error) {
      console.error('Failed to start Twitter stream:', error);
    }
  }

  /**
   * Handle Twitter mention
   */
  private async handleTwitterMention(tweet: any): Promise<void> {
    try {
      const mention: SocialMention = {
        id: tweet.id_str,
        platform: 'twitter',
        author: {
          id: tweet.user.id_str,
          username: tweet.user.screen_name,
          name: tweet.user.name,
          avatar: tweet.user.profile_image_url_https,
          verified: tweet.user.verified,
          followers: tweet.user.followers_count
        },
        content: tweet.text,
        timestamp: new Date(tweet.created_at),
        url: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        engagement: {
          likes: tweet.favorite_count,
          retweets: tweet.retweet_count
        },
        sentiment: this.analyzeSentiment(tweet.text),
        reach: tweet.user.followers_count
      };

      this.mentionHandlers.forEach(handler => handler(mention));

      // Create conversation if mention requires response