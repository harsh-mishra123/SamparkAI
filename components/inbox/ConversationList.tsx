'use client'

import { useState, useEffect } from 'react'
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  User,
  Mail,
  Phone
} from 'lucide-react'

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
  messages: Array<{
    id: string
    content: string
    createdAt: string
  }>
  updatedAt: string
}

export function ConversationList({ 
  onSelectConversation 
}: { 
  onSelectConversation?: (id: string) => void 
}) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/conversations')
      const data = await res.json()
      setConversations(data.conversations || [])
      
      // Auto-select first conversation
      if (data.conversations?.length > 0 && !selectedId) {
        const firstId = data.conversations[0].id
        setSelectedId(firstId)
        onSelectConversation?.(firstId)
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    onSelectConversation?.(id)
  }

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = 
      conv.customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus.toUpperCase()

    return matchesSearch && matchesFilter
  })

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'EMAIL': return <Mail className="w-4 h-4" />
      case 'PHONE': return <Phone className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="flex flex-col h-full bg-white/5 border-r border-white/10">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Conversations</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {['all', 'open', 'pending', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                filterStatus === status
                  ? 'bg-purple-500/30 text-purple-300'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1]
            
            return (
              <button
                key={conv.id}
                onClick={() => handleSelect(conv.id)}
                className={`w-full p-4 border-b border-white/10 text-left transition-colors ${
                  selectedId === conv.id
                    ? 'bg-purple-500/20'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {(conv.customer.name || conv.customer.email)[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium text-sm truncate">
                        {conv.customer.name || 'Unnamed Customer'}
                      </h4>
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate mb-2">
                      {conv.subject || conv.customer.email}
                    </p>
                    {lastMessage && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    conv.status === 'OPEN' ? 'bg-blue-500/20 text-blue-400' :
                    conv.status === 'PENDING' ? 'bg-orange-500/20 text-orange-400' :
                    conv.status === 'RESOLVED' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {conv.status}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    {getChannelIcon(conv.channel)}
                    {conv.channel}
                  </span>

                  {conv.priority === 'URGENT' && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400">
                      URGENT
                    </span>
                  )}
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
