'use client'

import { useState } from 'react'
import AIChatInterface from '@/components/chat/AIChatInterface'
import { MessageSquare } from 'lucide-react'

export default function AICustomerChatDemo() {
  const [conversationId, setConversationId] = useState('demo-conversation')

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Minimal Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="w-6 h-6 text-gray-400" />
            <h1 className="text-2xl font-light text-gray-100">AI Assistant</h1>
          </div>
          <p className="text-gray-500 text-sm">Helping Demo Customer</p>
        </div>

        {/* Minimal Chat Interface */}
        <div className="h-[calc(100vh-200px)] max-h-[700px] rounded-lg bg-gradient-to-b from-gray-950 to-black border border-gray-800 shadow-2xl overflow-hidden">
          <AIChatInterface 
            conversationId={conversationId}
            customerName="Demo Customer"
          />
        </div>

        {/* Minimal Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-xs">Powered by Google Gemini AI • Responses are AI-generated</p>
        </div>
      </div>
    </div>
  )
}
