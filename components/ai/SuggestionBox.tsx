'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check } from 'lucide-react'

interface ResponseSuggestion {
  brief: string
  detailed: string
  empathetic: string
}

interface SuggestionBoxProps {
  message: string
  conversationHistory?: Array<{role: string; content: string}>
  onSelect?: (suggestion: string) => void
}

export default function SuggestionBox({ 
  message, 
  conversationHistory,
  onSelect 
}: SuggestionBoxProps) {
  const [suggestions, setSuggestions] = useState<ResponseSuggestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const loadSuggestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          conversationHistory,
          type: 'suggestions'
        }),
      })

      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error('Failed to load suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
    
    if (onSelect) {
      onSelect(text)
    }
  }

  const suggestionTypes = suggestions ? [
    { label: 'Brief', text: suggestions.brief, color: 'from-blue-500 to-cyan-500' },
    { label: 'Detailed', text: suggestions.detailed, color: 'from-purple-500 to-pink-500' },
    { label: 'Empathetic', text: suggestions.empathetic, color: 'from-green-500 to-emerald-500' },
  ] : []

  if (!suggestions && !loading) {
    return (
      <button
        onClick={loadSuggestions}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
      >
        <Sparkles className="w-4 h-4" />
        Generate AI Suggestions
      </button>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
        <Sparkles className="w-4 h-4 text-purple-400" />
        AI Response Suggestions
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {suggestionTypes.map((suggestion, index) => (
            <div
              key={index}
              className="relative group rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 hover:bg-white/10 transition-all"
            >
              <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r ${suggestion.color} text-xs font-medium text-white`}>
                {suggestion.label}
              </div>
              
              <p className="text-sm text-gray-300 pr-20">
                {suggestion.text}
              </p>

              <button
                onClick={() => copyToClipboard(suggestion.text, index)}
                className="absolute bottom-2 right-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
