'use client'

import { Search } from 'lucide-react'

export function SearchBar(){
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all w-80"
        />
      </div>
    )
}
