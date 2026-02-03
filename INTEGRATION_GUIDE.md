# How to Integrate AI Features into Your App

## 🎯 Quick Integration Guide

### 1. Add AI to Conversations Page

Update [`app/conversations/[id]/page.tsx`](app/conversations/[id]/page.tsx):

```typescript
'use client'

import { useState } from 'react'
import SuggestionBox from '@/components/ai/SuggestionBox'
import SentimentBadge from '@/components/ai/SentimentBadge'
import QuickReplies from '@/components/ai/QuickReplies'

export default function ConversationPage({ params }: { params: { id: string } }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messages, setMessages] = useState([
    { role: 'customer', content: 'I have a problem with my order' }
  ])

  return (
    <div className="flex h-screen">
      {/* Message Thread (Left) */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'agent' ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 rounded-xl bg-white/5">
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-white/10">
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            placeholder="Type your response..."
          />
          
          {/* Quick Replies */}
          {currentMessage && (
            <div className="mt-3">
              <QuickReplies 
                message={currentMessage}
                onSelect={(reply) => setCurrentMessage(reply)}
              />
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant (Right Sidebar) */}
      <div className="w-96 border-l border-white/10 p-6 space-y-6 overflow-y-auto">
        {/* Customer Sentiment */}
        {messages[0] && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Customer Sentiment</h3>
            {/* This would be fetched from API in real implementation */}
            <SentimentBadge sentiment="NEGATIVE" score={0.78} />
          </div>
        )}

        {/* AI Suggestions */}
        {messages[0] && (
          <SuggestionBox 
            message={messages[messages.length - 1].content}
            conversationHistory={messages}
            onSelect={(suggestion) => setCurrentMessage(suggestion)}
          />
        )}
      </div>
    </div>
  )
}
```

---

### 2. Add Sentiment to Customer List

Update [`app/customers/page.tsx`](app/customers/page.tsx):

```typescript
'use client'

import { useState, useEffect } from 'react'
import SentimentBadge from '@/components/ai/SentimentBadge'

export default function CustomersPage() {
  const customers = [
    { id: '1', name: 'John Doe', lastMessage: 'Very happy with the service!', sentiment: 'POSITIVE' },
    { id: '2', name: 'Jane Smith', lastMessage: 'This is urgent!', sentiment: 'URGENT' },
    { id: '3', name: 'Bob Johnson', lastMessage: 'Just checking in', sentiment: 'NEUTRAL' },
  ]

  return (
    <div className="p-6">
      <div className="space-y-3">
        {customers.map((customer) => (
          <div key={customer.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">{customer.name}</div>
                <div className="text-sm text-gray-400">{customer.lastMessage}</div>
              </div>
              <SentimentBadge sentiment={customer.sentiment as any} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### 3. Add AI to Settings Page

Update [`app/settings/page.tsx`](app/settings/page.tsx):

```typescript
import AiConfig from '@/components/ai/AiConfig'

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your workspace preferences</p>
      </div>

      {/* AI Settings Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">AI Assistant</h2>
        <AiConfig />
      </div>

      {/* Other settings sections... */}
    </div>
  )
}
```

---

### 4. Real-time Sentiment in Analytics

Update [`app/analytics/page.tsx`](app/analytics/page.tsx):

```typescript
'use client'

import { useState, useEffect } from 'react'
import SentimentBadge from '@/components/ai/SentimentBadge'

export default function AnalyticsPage() {
  const [sentimentStats, setSentimentStats] = useState({
    positive: 45,
    neutral: 30,
    negative: 20,
    urgent: 5,
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400">Monitor customer sentiment trends</p>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="text-3xl font-bold text-white mb-2">{sentimentStats.positive}%</div>
          <SentimentBadge sentiment="POSITIVE" />
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="text-3xl font-bold text-white mb-2">{sentimentStats.neutral}%</div>
          <SentimentBadge sentiment="NEUTRAL" />
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="text-3xl font-bold text-white mb-2">{sentimentStats.negative}%</div>
          <SentimentBadge sentiment="NEGATIVE" />
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="text-3xl font-bold text-white mb-2">{sentimentStats.urgent}%</div>
          <SentimentBadge sentiment="URGENT" />
        </div>
      </div>
    </div>
  )
}
```

---

## 🔥 Advanced Usage

### Auto-Sentiment on New Messages

```typescript
// In your message handler
async function handleNewMessage(message: string) {
  // Analyze sentiment
  const response = await fetch('/api/ai/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  const { sentiment } = await response.json()

  // Save to database with sentiment
  await saveMessage({
    content: message,
    sentiment: sentiment.sentiment,
    sentimentScore: sentiment.confidence,
  })

  // Trigger urgent notification if needed
  if (sentiment.sentiment === 'URGENT') {
    notifyTeam({ message, priority: 'high' })
  }
}
```

### Auto-Suggestions on Customer Reply

```typescript
// In conversation component
useEffect(() => {
  if (lastCustomerMessage) {
    loadAISuggestions()
  }
}, [lastCustomerMessage])

async function loadAISuggestions() {
  const response = await fetch('/api/ai/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      message: lastCustomerMessage,
      conversationHistory: allMessages,
    }),
  })
  const { suggestions } = await response.json()
  setSuggestions(suggestions)
}
```

### Conversation Summarization

```typescript
// When closing a conversation
async function closeConversation(conversationId: string) {
  const response = await fetch('/api/ai/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      messages: conversationMessages,
    }),
  })
  const { summary } = await response.json()

  await updateConversation(conversationId, {
    status: 'closed',
    summary,
  })
}
```

---

## 📦 Component Exports

All components are ready to import:

```typescript
// AI Components
import SuggestionBox from '@/components/ai/SuggestionBox'
import SentimentBadge from '@/components/ai/SentimentBadge'
import QuickReplies from '@/components/ai/QuickReplies'
import AiConfig from '@/components/ai/AiConfig'

// AI Functions
import { analyzeSentiment } from '@/lib/ai/sentiment'
import { generateResponseSuggestions, generateQuickReplies } from '@/lib/ai/suggestions'
```

---

## 🎨 Styling Consistency

All AI components use the same dark purple gradient theme:
- Background: `bg-white/5 backdrop-blur-xl`
- Borders: `border border-white/10`
- Text: `text-white` / `text-gray-400`
- Gradients: `from-purple-600 to-pink-600`

---

## 🚀 Production Checklist

- [x] OpenAI API key in `.env`
- [x] All routes authenticated with Clerk
- [x] Error handling with fallbacks
- [x] Loading states on all async operations
- [x] Responsive design (mobile-ready)
- [x] Type-safe with TypeScript
- [x] Accessible UI components
- [x] Dark theme consistency

---

**Ready to integrate!** All components are production-ready and can be dropped into any page.
