'use client'

import { Home, MessageSquare, Users, BarChart, Settings, HelpCircle } from 'lucide-react'
import { NavItem } from './NavItem'

export function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: MessageSquare, label: 'Conversations', href: '/conversations' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: BarChart, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help', href: '/knowledge-base' },
  ]

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Support Suite
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"></div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-400">Agent</p>
          </div>
        </div>
      </div>
    </aside>
  )
}