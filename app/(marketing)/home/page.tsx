import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import StatsCard from '@/components/marketing/StatsCard';
import FeatureCard from '@/components/marketing/FeatureCard';
import { 
  MessageSquare, 
  Zap, 
  Brain, 
  BarChart3, 
  Users, 
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Inbox,
  Sparkles,
  Activity
} from 'lucide-react';

export default function HomePage() {
  const metrics = [
    { icon: Users, label: 'Active Users', value: '10K+', change: '+12% this month', trend: 'up' as const },
    { icon: MessageSquare, label: 'Messages Handled', value: '2.5M', change: '+28% this month', trend: 'up' as const },
    { icon: Clock, label: 'Avg Response Time', value: '< 2s', change: '-15% improvement', trend: 'up' as const },
    { icon: Star, label: 'Satisfaction Rate', value: '98%', change: '+5% this quarter', trend: 'up' as const },
  ];

  const features = [
    {
      icon: Inbox,
      title: 'Unified Inbox',
      description: 'Manage all customer conversations from email, chat, SMS, and social media in one centralized dashboard.',
    },
    {
      icon: Sparkles,
      title: 'AI Suggestions',
      description: 'Get intelligent response suggestions powered by advanced AI that understands context and customer intent.',
    },
    {
      icon: Brain,
      title: 'Sentiment Analysis',
      description: 'Automatically detect customer emotions and prioritize urgent or negative interactions for immediate attention.',
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Automate repetitive tasks and responses while maintaining a personal touch with customizable workflows.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance metrics, customer satisfaction, and team productivity with real-time dashboards.',
    },
    {
      icon: Activity,
      title: 'Multi-channel Support',
      description: 'Connect with customers wherever they are - email, chat, SMS, WhatsApp, and social platforms.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">AI-Powered Customer Support Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Customer Intelligence
              <br />
              <span className="gradient-text">That Actually Understands You</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Transform your customer support with AI that comprehends context, emotions, and intent. 
              Deliver exceptional experiences at scale with our intelligent platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/register">
                <button className="gradient-btn flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/features">
                <button className="glass-card px-8 py-3 rounded-lg font-semibold hover-lift">
                  View Features
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {metrics.map((metric, index) => (
              <StatsCard key={index} {...metric} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What is <span className="gradient-text">SamparkAI?</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              SamparkAI is an AI-powered customer support platform that revolutionizes how businesses interact with their customers. 
              We combine cutting-edge artificial intelligence with intuitive design to create a seamless support experience that 
              scales with your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="glass-card p-8 text-center hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Intelligence</h3>
              <p className="text-gray-400">
                Our advanced AI understands context, emotions, and intent to provide smart suggestions and automate responses while maintaining a human touch.
              </p>
            </div>

            <div className="glass-card p-8 text-center hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Unified Communication</h3>
              <p className="text-gray-400">
                Manage all customer conversations from email, chat, SMS, and social media in one centralized, powerful dashboard.
              </p>
            </div>

            <div className="glass-card p-8 text-center hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Data-Driven Insights</h3>
              <p className="text-gray-400">
                Real-time analytics and sentiment analysis help you understand customer needs and improve team performance continuously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How <span className="gradient-text">SamparkAI Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform your customer support in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="glass-card p-8 hover-lift">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Connect Your Channels</h3>
                <p className="text-gray-400 mb-4">
                  Integrate your email, chat, social media, and other communication channels in minutes. Our platform seamlessly connects with your existing tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">Email</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">WhatsApp</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">Slack</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">SMS</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 hover-lift">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Learns Your Business</h3>
                <p className="text-gray-400 mb-4">
                  Our AI analyzes your conversations, learns your brand voice, and starts suggesting contextually relevant responses automatically.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">Sentiment Analysis</span>
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">Smart Routing</span>
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">Auto-tagging</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 hover-lift">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Scale & Optimize</h3>
                <p className="text-gray-400 mb-4">
                  Watch your response times drop and customer satisfaction soar. Use real-time analytics to continuously improve your support operations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300">↓ 80% Response Time</span>
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300">↑ 98% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features to
              <span className="gradient-text"> Delight Customers</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to deliver world-class customer support at scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} gradient={index % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Perfect for <span className="gradient-text">Every Business</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From startups to enterprises, SamparkAI scales with your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">E-commerce & Retail</h3>
                  <p className="text-gray-400">
                    Handle order inquiries, returns, and product questions instantly. Reduce cart abandonment with proactive support.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">SaaS Companies</h3>
                  <p className="text-gray-400">
                    Provide technical support, onboard new users, and reduce churn with intelligent automation and quick responses.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500/20 to-orange-500/20">
                  <TrendingUp className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Financial Services</h3>
                  <p className="text-gray-400">
                    Secure, compliant customer communication with sentiment analysis to identify at-risk customers early.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/20">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Healthcare & Wellness</h3>
                  <p className="text-gray-400">
                    HIPAA-compliant patient communication, appointment scheduling, and 24/7 support with AI assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of companies using SamparkAI to deliver exceptional customer experiences
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">2.5M</div>
                <div className="text-gray-400">Messages/Month</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">98%</div>
                <div className="text-gray-400">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">&lt;2s</div>
                <div className="text-gray-400">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Customer Support?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Start your free trial today. No credit card required.
              </p>
              <Link href="/login">
                <button className="gradient-btn text-lg">
                  Get Started for Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
