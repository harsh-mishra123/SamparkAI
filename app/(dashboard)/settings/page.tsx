'use client'

import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { MessageSquare, Clock, Settings as SettingsIcon, LogOut, ChevronRight, Bot, User } from 'lucide-react'
import Link from 'next/link'

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
  preview: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'settings'>('history')

  // Mock chat history data
  const chatHistory: ChatHistory[] = [
    {
      id: '1',
      title: 'Password Reset Help',
      timestamp: new Date(2026, 0, 31, 14, 30),
      preview: 'How do I reset my password?'
    },
    {
      id: '2',
      title: 'Pricing Information',
      timestamp: new Date(2026, 0, 31, 10, 15),
      preview: 'Can you explain your pricing plans?'
    },
    {
      id: '3',
      title: 'Technical Documentation',
      timestamp: new Date(2026, 0, 30, 16, 45),
      preview: 'Where can I find the API documentation?'
    },
    {
      id: '4',
      title: 'Account Setup',
      timestamp: new Date(2026, 0, 29, 9, 20),
      preview: 'Help me set up my account properly'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Header */}
      <div className="border-b border-purple-500/20 backdrop-blur-sm bg-slate-950/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SamparkAI</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account and view chat history</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-purple-500/20 rounded-2xl p-4 backdrop-blur-sm space-y-2">
              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'history'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="font-medium">Chat History</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <SettingsIcon className="w-5 h-5" />
                <span className="font-medium">Preferences</span>
              </button>

              <div className="pt-4 border-t border-purple-500/20">
                <Link
                  href="/api/auth/signout"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Chat History</h2>
                  <Link
                    href="/support"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all"
                  >
                    New Chat
                  </Link>
                </div>

                <div className="space-y-3">
                  {chatHistory.map((chat) => (
                    <Link
                      key={chat.id}
                      href={`/support?id=${chat.id}`}
                      className="block p-6 rounded-2xl bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-slate-900/70 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Bot className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                              {chat.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-2">{chat.preview}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              <span>
                                {chat.timestamp.toLocaleDateString()} at{' '}
                                {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>

                {chatHistory.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-10 h-10 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No chat history yet</h3>
                    <p className="text-slate-400 mb-6">Start a conversation with our AI assistant</p>
                    <Link
                      href="/support"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all"
                    >
                      Start Chatting
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>

                <div className="bg-slate-900/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Email Notifications</label>
                      <select className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50">
                        <option>All notifications</option>
                        <option>Important only</option>
                        <option>None</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Language</label>
                      <select className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Time Zone</label>
                      <select className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50">
                        <option>UTC (GMT+0)</option>
                        <option>EST (GMT-5)</option>
                        <option>PST (GMT-8)</option>
                        <option>IST (GMT+5:30)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">AI Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Auto-suggestions</h4>
                        <p className="text-sm text-slate-400">Get AI-powered response suggestions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Sentiment Analysis</h4>
                        <p className="text-sm text-slate-400">Analyze message sentiment automatically</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
