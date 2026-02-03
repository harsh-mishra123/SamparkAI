'use client';

import { useState } from 'react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Video,
  FileText,
  Zap,
} from 'lucide-react';

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I get started with SamparkAI?',
          answer: 'Getting started is easy! Sign up for a free trial, connect your communication channels (email, chat, etc.), and invite your team members. Our onboarding wizard will guide you through the initial setup in just a few minutes.',
        },
        {
          question: 'What channels does SamparkAI support?',
          answer: 'SamparkAI supports email, live chat, SMS, WhatsApp Business, Facebook Messenger, Instagram DMs, Twitter DMs, and custom API integrations. You can manage all these channels from a single unified inbox.',
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can cancel anytime during or after the trial period.',
        },
      ],
    },
    {
      category: 'Features & Functionality',
      questions: [
        {
          question: 'How does the AI suggestion system work?',
          answer: 'Our AI analyzes incoming messages using natural language processing, considers conversation context and customer history, then generates contextually relevant response suggestions. The AI learns from your team\'s feedback to improve over time.',
        },
        {
          question: 'Can I customize automation workflows?',
          answer: 'Absolutely! You can create custom automation rules based on triggers (keywords, sentiment, channel, etc.) and actions (auto-reply, assign, tag, notify, etc.). Our visual workflow builder makes it easy to set up complex automations without coding.',
        },
        {
          question: 'What analytics and reports are available?',
          answer: 'We provide comprehensive analytics including response times, resolution rates, customer satisfaction scores, team performance metrics, sentiment trends, and channel-specific insights. All reports can be exported and scheduled for automatic delivery.',
        },
      ],
    },
    {
      category: 'Security & Compliance',
      questions: [
        {
          question: 'Is my data secure?',
          answer: 'Yes. We use bank-grade TLS 1.3 encryption for data in transit and AES-256 encryption for data at rest. We\'re SOC 2 Type II certified and comply with GDPR, CCPA, and other major data protection regulations.',
        },
        {
          question: 'Where is data stored?',
          answer: 'Data is stored in secure, redundant data centers in the US, EU, and Asia-Pacific regions. You can choose your preferred data region during setup. We maintain 99.9% uptime SLA with automatic backups.',
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export all your data at any time in standard formats (CSV, JSON). We also provide comprehensive data portability tools to help you migrate if needed.',
        },
      ],
    },
    {
      category: 'Pricing & Billing',
      questions: [
        {
          question: 'What are your pricing plans?',
          answer: 'We offer flexible plans starting from $29/month for small teams, $99/month for growing businesses, and custom enterprise pricing. All plans include core features with varying limits on users, conversations, and integrations.',
        },
        {
          question: 'Can I change plans anytime?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, changes take effect immediately. When downgrading, changes apply at the next billing cycle. No long-term contracts required.',
        },
        {
          question: 'Do you offer discounts for nonprofits or educational institutions?',
          answer: 'Yes! We offer 50% discounts for registered nonprofits and educational institutions. Contact our sales team with your organization details to apply for the discount.',
        },
      ],
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@samparkai.com',
      availability: 'Response within 2 hours',
      action: 'Send Email',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      availability: 'Mon-Fri, 9 AM - 6 PM EST',
      action: 'Call Now',
    },
  ];

  const knowledgeBase = [
    {
      icon: BookOpen,
      title: 'User Guides',
      description: 'Step-by-step tutorials and guides',
      count: '50+ articles',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn through video walkthroughs',
      count: '20+ videos',
    },
    {
      icon: FileText,
      title: 'API Documentation',
      description: 'Technical docs for developers',
      count: 'Complete reference',
    },
    {
      icon: Zap,
      title: 'Quick Start',
      description: 'Get up and running in 5 minutes',
      count: 'Beginner friendly',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">We're Here to Help</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How Can We
            <br />
            <span className="gradient-text">Help You Today?</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Find answers in our knowledge base, browse FAQs, or reach out to our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-2 flex items-center gap-3">
              <Search className="text-gray-400 ml-2" size={20} />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, guides..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Get in <span className="gradient-text">Touch</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="gradient-border p-8 text-center hover-lift">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <method.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-gray-300 mb-2">{method.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
                    <Clock size={14} />
                    <span>{method.availability}</span>
                  </div>
                  <button className="gradient-btn w-full">{method.action}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Knowledge <span className="gradient-text">Base</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {knowledgeBase.map((item, index) => (
              <div key={index} className="glass-card p-6 hover-lift cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <item.icon className="text-purple-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <p className="text-purple-400 text-sm font-semibold">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Find quick answers to common questions about SamparkAI
          </p>

          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-bold mb-4 gradient-text">{category.category}</h3>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openFAQ === globalIndex;

                    return (
                      <div key={faqIndex} className="glass-card overflow-hidden">
                        <button
                          className="w-full p-6 text-left flex items-start justify-between hover:bg-white/5 transition-colors"
                          onClick={() => toggleFAQ(globalIndex)}
                        >
                          <span className="font-semibold pr-4">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="flex-shrink-0 text-purple-400" size={24} />
                          ) : (
                            <ChevronDown className="flex-shrink-0 text-gray-400" size={24} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {searchQuery && filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-500">Try a different search term or contact our support team</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Our support team is ready to help you succeed
              </p>
              <button className="gradient-btn text-lg">Contact Support Team</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
