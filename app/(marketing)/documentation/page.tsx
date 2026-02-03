import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import {
  Code,
  Book,
  Rocket,
  Puzzle,
  Terminal,
  FileCode,
  GitBranch,
  CheckCircle,
  ExternalLink,
  Copy,
} from 'lucide-react';

export default function DocumentationPage() {
  const sections = [
    {
      icon: Rocket,
      title: 'Getting Started',
      description: 'Quick setup guide to get you up and running in minutes',
      items: [
        'Account Creation',
        'Initial Configuration',
        'Team Setup',
        'Channel Integration',
      ],
    },
    {
      icon: Puzzle,
      title: 'Integration Guides',
      description: 'Connect SamparkAI with your existing tools and platforms',
      items: [
        'Email Integration',
        'Slack Connection',
        'WhatsApp Business API',
        'Custom Webhooks',
      ],
    },
    {
      icon: Code,
      title: 'API Reference',
      description: 'Complete API documentation with examples and best practices',
      items: [
        'Authentication',
        'REST API Endpoints',
        'WebSocket Events',
        'Rate Limits',
      ],
    },
    {
      icon: Terminal,
      title: 'SDK & Libraries',
      description: 'Official SDKs for popular programming languages',
      items: [
        'JavaScript/TypeScript',
        'Python',
        'Ruby',
        'PHP',
      ],
    },
  ];

  const quickStartCode = `// Install the SamparkAI SDK
npm install @samparkai/client

// Initialize the client
import { SamparkAI } from '@samparkai/client';

const client = new SamparkAI({
  apiKey: process.env.SAMPARK_API_KEY,
});

// Send a message
const response = await client.messages.create({
  channel: 'email',
  to: 'customer@example.com',
  subject: 'Your Support Request',
  body: 'Thank you for reaching out!',
});`;

  const apiExample = `// Fetch conversations
const conversations = await client.conversations.list({
  status: 'open',
  limit: 20,
  sortBy: 'created_at',
});

// Get AI suggestions
const suggestions = await client.ai.getSuggestions({
  conversationId: 'conv_123',
  context: 'customer_inquiry',
});

// Analyze sentiment
const sentiment = await client.ai.analyzeSentiment({
  text: 'I am very happy with the service!',
});`;

  const webhookExample = `// Webhook endpoint example (Express.js)
app.post('/webhooks/samparkai', async (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'message.received':
      await handleNewMessage(data);
      break;
    case 'conversation.closed':
      await handleClosedConversation(data);
      break;
  }
  
  res.json({ success: true });
});`;

  const technicalSpecs = [
    {
      category: 'Authentication',
      specs: [
        { key: 'Method', value: 'API Key & OAuth 2.0' },
        { key: 'Header', value: 'Authorization: Bearer YOUR_API_KEY' },
        { key: 'Security', value: 'TLS 1.3 Encryption' },
      ],
    },
    {
      category: 'Rate Limits',
      specs: [
        { key: 'Standard Plan', value: '1,000 requests/hour' },
        { key: 'Pro Plan', value: '5,000 requests/hour' },
        { key: 'Enterprise', value: 'Custom limits available' },
      ],
    },
    {
      category: 'Data Format',
      specs: [
        { key: 'Request', value: 'JSON (application/json)' },
        { key: 'Response', value: 'JSON with standard status codes' },
        { key: 'Encoding', value: 'UTF-8' },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Book className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Developer Documentation</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Build Powerful Integrations
            <br />
            <span className="gradient-text">With Our API</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive documentation, code examples, and integration guides to help you get started quickly.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => (
              <div key={index} className="glass-card p-6 hover-lift cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mb-4">
                  <section.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="text-green-400" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Quick <span className="gradient-text">Start Guide</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Get up and running with SamparkAI in just a few minutes
          </p>

          <div className="gradient-border p-8">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileCode className="text-purple-400" size={20} />
                  <span className="font-semibold">Installation & Setup</span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Copy size={20} />
                </button>
              </div>
              <pre className="bg-black/50 rounded-lg p-6 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{quickStartCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Examples */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            API <span className="gradient-text">Examples</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Example 1 */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code className="text-purple-400" size={20} />
                  <span className="font-semibold">Working with Conversations</span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Copy size={18} />
                </button>
              </div>
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-xs text-gray-300 font-mono">{apiExample}</code>
              </pre>
            </div>

            {/* Example 2 */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="text-purple-400" size={20} />
                  <span className="font-semibold">Webhook Integration</span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Copy size={18} />
                </button>
              </div>
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                <code className="text-xs text-gray-300 font-mono">{webhookExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Technical <span className="gradient-text">Specifications</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalSpecs.map((section, index) => (
              <div key={index} className="gradient-border p-6">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6">{section.category}</h3>
                  <div className="space-y-4">
                    {section.specs.map((spec, idx) => (
                      <div key={idx}>
                        <div className="text-sm text-gray-400 mb-1">{spec.key}</div>
                        <div className="text-white font-mono text-sm">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Additional <span className="gradient-text">Resources</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="glass-card p-6 hover-lift group">
              <Book className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                API Reference
                <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
              </h3>
              <p className="text-gray-400">
                Complete API documentation with all endpoints and parameters
              </p>
            </a>

            <a href="#" className="glass-card p-6 hover-lift group">
              <Terminal className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                Code Examples
                <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
              </h3>
              <p className="text-gray-400">
                Sample code and implementation examples in multiple languages
              </p>
            </a>

            <a href="#" className="glass-card p-6 hover-lift group">
              <GitBranch className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                GitHub Repos
                <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
              </h3>
              <p className="text-gray-400">
                Open-source SDKs and integration examples on GitHub
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Help Getting Started?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Our developer support team is here to assist you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="gradient-btn">Contact Support</button>
                <button className="glass-card px-8 py-3 rounded-lg font-semibold hover-lift">
                  Join Developer Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
