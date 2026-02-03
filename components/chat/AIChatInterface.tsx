'use client'

import { useState, useEffect } from 'react'
import { Send, Loader2, Bot, X, History, Sun, Moon } from 'lucide-react'

interface AIChatInterfaceProps {
  conversationId: string
  customerName?: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatInterface({ conversationId, customerName }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; messages: Message[]; date: string }>>([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory')
    if (saved) {
      setChatHistory(JSON.parse(saved))
    }
  }, [])

  // Save current conversation to history
  const saveToHistory = () => {
    if (messages.length === 0) return
    
    const newHistory = {
      id: Date.now().toString(),
      messages: messages,
      date: new Date().toLocaleString()
    }
    
    const updated = [newHistory, ...chatHistory]
    setChatHistory(updated)
    localStorage.setItem('chatHistory', JSON.stringify(updated))
  }

  const handleExit = () => {
    if (messages.length > 0) {
      saveToHistory()
    }
    setMessages([])
    setInput('')
  }

  const loadHistoryChat = (historyItem: { id: string; messages: Message[]; date: string }) => {
    setMessages(historyItem.messages)
    setShowHistory(false)
  }

  const deleteHistoryItem = (id: string) => {
    const updated = chatHistory.filter(item => item.id !== id)
    setChatHistory(updated)
    localStorage.setItem('chatHistory', JSON.stringify(updated))
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    const newMessage: Message = { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    setLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          message: userMessage,
          conversationHistory: messages,
        }),
      })

      const data = await response.json()
      
      if (data.response) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response,
          timestamp: new Date()
        }])
      } else if (data.error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Error: ${data.error}`,
          timestamp: new Date()
        }])
      }
    } catch (error) {
      console.error('Failed to get AI response:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please make sure the GOOGLE_API_KEY is configured in .env.local',
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  const bgClass = isDarkMode 
    ? 'bg-gradient-to-b from-gray-950 to-black' 
    : 'bg-gradient-to-b from-white to-gray-50'
  const borderClass = isDarkMode ? 'border-gray-800' : 'border-gray-200'
  const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-800'
  const mutedTextClass = isDarkMode ? 'text-gray-500' : 'text-gray-600'
  const inputBgClass = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'
  const bubbleBgClass = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
  const userBubbleBgClass = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-100 border-blue-200'

  return (
    <div className={`flex flex-col h-full ${bgClass}`}>
      {/* Header with Exit and Theme Toggle */}
      <div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <Bot className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div>
            <h3 className={`text-sm font-medium ${textClass}`}>AI Assistant</h3>
            <p className={`text-xs ${mutedTextClass}`}>
              {customerName ? `${customerName}` : 'Online'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-gray-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" />
            )}
          </button>
          
          {/* History Button */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors relative`}
            title="View chat history"
          >
            <History className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            {chatHistory.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                {chatHistory.length}
              </span>
            )}
          </button>
          
          {/* Exit Button */}
          <button
            onClick={handleExit}
            className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors`}
            title="Exit chat"
          >
            <X className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className={`border-b ${borderClass} p-4 max-h-64 overflow-y-auto`}>
          <h3 className={`text-sm font-medium ${textClass} mb-3`}>Chat History</h3>
          {chatHistory.length === 0 ? (
            <p className={`text-xs ${mutedTextClass}`}>No chat history yet</p>
          ) : (
            <div className="space-y-2">
              {chatHistory.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'} hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors cursor-pointer`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1" onClick={() => loadHistoryChat(item)}>
                      <p className={`text-xs ${mutedTextClass} mb-1`}>{item.date}</p>
                      <p className={`text-sm ${textClass} line-clamp-2`}>
                        {item.messages[0]?.content || 'Empty chat'}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteHistoryItem(item.id)
                      }}
                      className={`p-1 rounded hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
                    >
                      <X className={`w-3 h-3 ${mutedTextClass}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className={`w-10 h-10 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-3`} />
            <h3 className={`text-base font-medium ${textClass} mb-1`}>Start a conversation</h3>
            <p className={`text-sm ${mutedTextClass} max-w-sm`}>
              Ask anything. I'm here to help.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                  msg.role === 'user'
                    ? isDarkMode ? 'bg-gray-700' : 'bg-blue-200'
                    : isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              >
                {msg.role === 'user' ? (
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>U</span>
                ) : (
                  <Bot className={`w-3.5 h-3.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                )}
              </div>
              <div
                className={`flex-1 max-w-[80%] p-3 rounded-lg border ${
                  msg.role === 'user'
                    ? userBubbleBgClass
                    : bubbleBgClass
                }`}
              >
                <p className={`text-sm ${textClass} leading-relaxed whitespace-pre-wrap`}>{msg.content}</p>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex gap-2">
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
              <Bot className={`w-3.5 h-3.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${bubbleBgClass}`}>
              <Loader2 className={`w-3.5 h-3.5 ${mutedTextClass} animate-spin`} />
              <span className={`text-sm ${mutedTextClass}`}>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Minimal Input */}
      <div className={`p-4 border-t ${borderClass}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className={`flex-1 px-3 py-2.5 rounded-lg border ${inputBgClass} ${textClass} text-sm placeholder-${mutedTextClass} focus:outline-none focus:${isDarkMode ? 'border-gray-700' : 'border-gray-400'} transition-colors`}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className={`px-4 py-2.5 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
