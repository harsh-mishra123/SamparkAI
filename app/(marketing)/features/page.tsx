import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import FeatureCard from '@/components/marketing/FeatureCard';
import {
  Inbox,
  Sparkles,
  Brain,
  Zap,
  BarChart3,
  Activity,
  MessageSquare,
  Search,
  Lightbulb,
  Send,
  CheckCircle,
  ArrowRight,
  Target,
  Settings,
  Globe,
  Shield,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function FeaturesPage() {
  const aiPipeline = [
    {
      stage: 1,
      icon: MessageSquare,
      title: 'Message Ingestion',
      description: 'Capture and normalize incoming messages from all channels - email, chat, SMS, and social media into a unified format.',
      details: ['Multi-channel support', 'Real-time processing', 'Format normalization', 'Metadata extraction'],
    },
    {
      stage: 2,
      icon: Search,
      title: 'Context Analysis',
      description: 'Deep analysis of message content, customer history, and conversation context using advanced NLP and machine learning.',
      details: ['Natural Language Processing', 'Customer history lookup', 'Intent recognition', 'Entity extraction'],
    },
    {
      stage: 3,
      icon: Brain,
      title: 'Sentiment Detection',
      description: 'Identify emotional tone and urgency levels to prioritize critical conversations and route to appropriate team members.',
      details: ['Emotion detection', 'Urgency scoring', 'Priority assignment', 'Smart routing'],
    },
    {
      stage: 4,
      icon: Lightbulb,
      title: 'Response Generation',
      description: 'AI generates contextually relevant response suggestions based on knowledge base, past interactions, and best practices.',
      details: ['Smart suggestions', 'Knowledge base integration', 'Personalization', 'Multi-language support'],
    },
    {
      stage: 5,
      icon: Send,
      title: 'Learning & Optimization',
      description: 'Continuous learning from agent feedback and outcomes to improve accuracy and relevance of future suggestions.',
      details: ['Feedback loop', 'Performance tracking', 'Model refinement', 'Quality improvement'],
    },
  ];

  const coreFeatures = [
    {
      icon: Inbox,
      title: 'Unified Inbox',
      description: 'Centralize all customer conversations from email, chat, SMS, WhatsApp, and social media in one intelligent dashboard.',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Suggestions',
      description: 'Get smart response recommendations that understand context, tone, and customer intent for faster resolutions.',
    },
    {
      icon: Brain,
      title: 'Sentiment Analysis',
      description: 'Automatically detect customer emotions and satisfaction levels to prioritize urgent or negative interactions.',
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Automate routine tasks, responses, and workflows while maintaining personalization and quality.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track key metrics, team performance, and customer satisfaction with comprehensive real-time dashboards.',
    },
    {
      icon: Activity,
      title: 'Multi-Channel Support',
      description: 'Seamlessly handle conversations across all major communication channels from a single interface.',
    },
  ];

  const capabilities = [
    { icon: Target, title: 'Smart Routing', description: 'Intelligent ticket assignment based on skills and availability' },
    { icon: Settings, title: 'Customizable Workflows', description: 'Build automation rules tailored to your business needs' },
    { icon: Globe, title: 'Multi-Language', description: 'Support customers in 50+ languages with AI translation' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption and compliance certifications' },
    { icon: Clock, title: '24/7 Availability', description: 'AI assistant handles queries round the clock' },
    { icon: TrendingUp, title: 'Continuous Learning', description: 'AI improves over time based on your data and feedback' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Features That Power
            <br />
            <span className="gradient-text">Exceptional Support</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how our AI-driven platform transforms customer conversations into meaningful relationships and actionable insights.
          </p>
        </div>
      </section>

      {/* AI Pipeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our 5-Stage <span className="gradient-text">AI Pipeline</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how our intelligent system processes and enhances every customer interaction
            </p>
          </div>

          <div className="space-y-8">
            {aiPipeline.map((stage, index) => (
              <div key={index} className="gradient-border p-8 hover-lift">
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                  {/* Stage Number and Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                        <stage.icon className="text-white" size={36} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-sm font-bold">
                        {stage.stage}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{stage.title}</h3>
                    <p className="text-gray-400 text-lg mb-4">{stage.description}</p>
                    
                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stage.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="text-green-400 flex-shrink-0" size={18} />
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  {index < aiPipeline.length - 1 && (
                    <div className="hidden md:flex items-center justify-center">
                      <ArrowRight className="text-purple-400" size={32} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Core <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to deliver world-class customer support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} gradient={index % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Additional <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced features to scale your support operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="glass-card p-6 hover-lift">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <capability.icon className="text-purple-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{capability.title}</h3>
                <p className="text-gray-400 text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience the Power of AI-Driven Support
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Start your free trial and see how SamparkAI transforms your customer experience
              </p>
              <button className="gradient-btn text-lg">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
