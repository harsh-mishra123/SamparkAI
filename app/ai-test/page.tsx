'use client'

import { useState } from 'react'
import SuggestionBox from '@/components/ai/SuggestionBox'
import SentimentBadge from '@/components/ai/SentimentBadge'
import QuickReplies from '@/components/ai/QuickReplies'
import AiConfig from '@/components/ai/AiConfig'
import { Sparkles, MessageSquare, TrendingUp } from 'lucide-react'

export default function AITestPage() {
  const [testMessage, setTestMessage] = useState('I am having issues with my order')
  const [sentimentResult, setSentimentResult] = useState<any>(null)
  const [loadingSentiment, setLoadingSentiment] = useState(false)

  const analyzeSentiment = async () => {
    setLoadingSentiment(true)
    try {
      const response = await fetch('/api/ai/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: testMessage }),
      })
      const data = await response.json()
      setSentimentResult(data.sentiment)
    } catch (error) {
      console.error('Sentiment analysis failed:', error)
    } finally {
      setLoadingSentiment(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">AI Features Test Lab</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Test and demonstrate OpenAI-powered customer support features
          </p>
        </div>

        {/* Test Message Input */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-white">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            Test Customer Message
          </div>
          <textarea
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
            placeholder="Enter a customer message to test AI features..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Sentiment Analysis */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Sentiment Analysis
              </div>
              
              <button
                onClick={analyzeSentiment}
                disabled={loadingSentiment}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all disabled:opacity-50"
              >
                {loadingSentiment ? 'Analyzing...' : 'Analyze Sentiment'}
              </button>

              {sentimentResult && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">Detected Sentiment:</span>
                    <SentimentBadge 
                      sentiment={sentimentResult.sentiment} 
                      score={sentimentResult.confidence}
                    />
                  </div>
                  
                  {sentimentResult.reason && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-medium text-gray-400 mb-1">Reasoning:</div>
                      <div className="text-sm text-gray-300">{sentimentResult.reason}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <SentimentBadge sentiment="POSITIVE" size="sm" />
                    <SentimentBadge sentiment="NEUTRAL" size="sm" />
                    <SentimentBadge sentiment="NEGATIVE" size="sm" />
                    <SentimentBadge sentiment="URGENT" size="sm" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">
              <div className="text-lg font-semibold text-white">
                Quick Replies
              </div>
              <QuickReplies 
                message={testMessage}
                onSelect={(reply) => alert(`Selected: ${reply}`)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">
              <div className="text-lg font-semibold text-white">
                Response Suggestions
              </div>
              <SuggestionBox 
                message={testMessage}
                onSelect={(suggestion) => alert(`Copied: ${suggestion}`)}
              />
            </div>

            {/* AI Configuration */}
            <AiConfig />
          </div>
        </div>

        {/* Demo Conversation */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">
          <div className="text-lg font-semibold text-white">
            Demo Conversation Context
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                C
              </div>
              <div className="flex-1 p-3 rounded-xl bg-blue-600/20 border border-blue-500/30">
                <div className="text-sm text-white">
                  Hi, I ordered a product last week but haven't received it yet. Can you help?
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <div className="flex-1 p-3 rounded-xl bg-purple-600/20 border border-purple-500/30">
                <div className="text-sm text-white">
                  I'd be happy to help you track your order. Could you please provide your order number?
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                C
              </div>
              <div className="flex-1 p-3 rounded-xl bg-blue-600/20 border border-blue-500/30">
                <div className="text-sm text-white">
                  {testMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
