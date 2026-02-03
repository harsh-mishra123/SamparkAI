'use client'

import { UserButton } from '@clerk/nextjs'
import { Bell, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 border-b border-purple-500/20 bg-slate-950/30 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search conversations, customers..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Button */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
