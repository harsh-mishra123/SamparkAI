'use client'

import { MessageSquarePlus, Users, FileText, Settings, Zap, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function QuickActions() {
  const router = useRouter()

  const quickActions = [
    {
      icon: MessageSquarePlus,
      label: 'New Conversation',
      description: 'Start a new support conversation',
      onClick: () => router.push('/conversations')
    },
    {
      icon: Users,
      label: 'Add Customer',
      description: 'Add a new customer to the system',
      onClick: () => router.push('/customers')
    },
    {
      icon: FileText,
      label: 'Create Report',
      description: 'Generate performance report',
      onClick: () => router.push('/analytics')
    },
    {
      icon: Settings,
      label: 'Automation Rules',
      description: 'Configure automated workflows',
      onClick: () => router.push('/automations')
    },
    {
      icon: Zap,
      label: 'Integrations',
      description: 'Manage third-party integrations',
      onClick: () => router.push('/settings')
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'View recent notifications',
      onClick: () => router.push('/settings')
    }
  ]

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Quick Actions
      </h2>
      
      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group border border-white/10"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <action.icon className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                {action.label}
              </p>
              <p className="text-xs text-gray-400">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
