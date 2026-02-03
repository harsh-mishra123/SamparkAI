'use client'

import { useState } from 'react'
import { MessageCircle, MessageSquare, HelpCircle, CheckCircle } from 'lucide-react'

interface QuickReply {
  text: string
  category: 'greeting' | 'question' | 'solution' | 'followup'
}

interface QuickRepliesProps {
  message: string
  onSelect?: (reply: string) => void
}

const categoryIcons = {
  greeting: MessageCircle,
  question: HelpCircle,
  solution: CheckCircle,
  followup: MessageSquare,
}

const categoryColors = {
  greeting: 'from-blue-500 to-cyan-500',
  question: 'from-purple-500 to-pink-500',
  solution: 'from-green-500 to-emerald-500',
  followup: 'from-orange-500 to-amber-500',
}

export default function QuickReplies({ message, onSelect }: QuickRepliesProps) {
  const [replies, setReplies] = useState<QuickReply[]>([])
  const [loading, setLoading] = useState(false)

  const loadQuickReplies = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          type: 'quick-replies'
        }),
      })

      const data = await response.json()
      setReplies(data.quickReplies || [])
    } catch (error) {
      console.error('Failed to load quick replies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (reply: QuickReply) => {
    if (onSelect) {
      onSelect(reply.text)
    }
  }

  if (!replies.length && !loading) {
    return (
      <button
        onClick={loadQuickReplies}
        className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
      >
        Load Quick Replies
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-gray-400">Quick Replies</div>
      
      {loading ? (
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-32 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {replies.map((reply, index) => {
            const Icon = categoryIcons[reply.category]
            const gradient = categoryColors[reply.category]
            
            return (
              <button
                key={index}
                onClick={() => handleSelect(reply)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${gradient} text-white text-sm font-medium hover:opacity-80 transition-opacity`}
              >
                <Icon className="w-3.5 h-3.5" />
                {reply.text}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
