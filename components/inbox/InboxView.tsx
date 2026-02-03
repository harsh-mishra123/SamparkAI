'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Tag, 
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  Bot,
  Sparkles
} from 'lucide-react'
import { SentimentBadge } from '@/components/ai/SentimentBadge'
import SuggestionBox from '@/components/ai/SuggestionBox'

interface Message {
  id: string
  content: string
  senderType: 'CUSTOMER' | 'AGENT' | 'AI' | 'SYSTEM'
  createdAt: string
  aiSuggestions?: any
}

interface Conversation {
  id: string
  subject: string | null
  status: string
  priority: string
  channel: string
  customer: {
    id: string
    name: string | null
    email: string
  }
  messages: Message[]
}

export function InboxView({ conversationId }: { conversationId?: string }) {
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (conversationId) {
      fetchConversation()
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchConversation = async () => {
    try {
      const res = await fetch(`/api/conversations/${conversationId}`)
      const data = await res.json()
      setConversation(data.conversation)
      setMessages(data.conversation.messages || [])
    } catch (error) {
      console.error('Failed to fetch conversation:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return

    setLoading(true)
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessage,
          senderType: 'AGENT'
        })
      })

      if (res.ok) {
        setNewMessage('')
        fetchConversation()
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const updateConversationStatus = async (status: string) => {
    try {
      await fetch(`/api/conversations/${conversationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      fetchConversation()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-full bg-white/5">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No conversation selected</h3>
          <p className="text-gray-400">Select a conversation to view messages</p>
        </div>
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white/5">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              {(conversation.customer.name || conversation.customer.email)[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-white font-semibold">
                {conversation.customer.name || 'Unnamed Customer'}
              </h3>
              <p className="text-sm text-gray-400">{conversation.customer.email}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs rounded-full ${
            conversation.status === 'OPEN' ? 'bg-blue-500/20 text-blue-400' :
            conversation.status === 'PENDING' ? 'bg-orange-500/20 text-orange-400' :
            conversation.status === 'RESOLVED' ? 'bg-green-500/20 text-green-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {conversation.status}
          </span>

          <span className={`px-3 py-1 text-xs rounded-full ${
            conversation.priority === 'URGENT' ? 'bg-red-500/20 text-red-400' :
            conversation.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
            conversation.priority === 'MEDIUM' ? 'bg-blue-500/20 text-blue-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {conversation.priority}
          </span>

          <select
            value={conversation.status}
            onChange={(e) => updateConversationStatus(e.target.value)}
            className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="OPEN">Open</option>
            <option value="PENDING">Pending</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>

          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderType === 'CUSTOMER' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-xl p-4 ${
                message.senderType === 'CUSTOMER'
                  ? 'bg-white/10 text-white'
                  : message.senderType === 'AI'
                  ? 'bg-purple-500/20 border border-purple-500/30 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-xs opacity-75">
                {message.senderType === 'AI' && <Bot className="w-3 h-3" />}
                {message.senderType === 'AGENT' && <User className="w-3 h-3" />}
                <span>
                  {message.senderType === 'CUSTOMER' ? 'Customer' : 
                   message.senderType === 'AI' ? 'AI Assistant' :
                   message.senderType === 'AGENT' ? 'You' : 'System'}
                </span>
                <span>•</span>
                <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Suggestions */}
      {showAiSuggestions && messages.length > 0 && (
        <div className="border-t border-white/10 p-4 bg-purple-500/10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI Suggested Responses</span>
          </div>
          <SuggestionBox 
            conversationId={conversationId}
            onSelectSuggestion={(text) => setNewMessage(text)}
          />
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setShowAiSuggestions(!showAiSuggestions)}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              showAiSuggestions
                ? 'bg-purple-500/30 text-purple-300'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            AI Suggestions
          </button>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
              rows={3}
              disabled={loading}
            />
            <div className="flex items-center gap-2 mt-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Paperclip className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Smile className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InboxView
