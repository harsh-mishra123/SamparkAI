'use client'

import { MessageSquare, UserPlus, CheckCircle, AlertTriangle, Phone, Mail } from 'lucide-react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

const activities = [
  {
    id: 1,
    type: 'message',
    user: 'John Doe',
    action: 'sent a message',
    details: 'Need help with my order #ORD-789',
    time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 2,
    type: 'new_customer',
    user: 'Sarah Chen',
    action: 'created an account',
    details: 'New customer from Google',
    time: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    icon: UserPlus,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    id: 3,
    type: 'resolved',
    user: 'Agent Mike',
    action: 'resolved a ticket',
    details: 'Ticket #TKT-456 - Payment issue',
    time: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    icon: CheckCircle,
    color: 'text-teal-500',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30'
  },
  {
    id: 4,
    type: 'escalated',
    user: 'System',
    action: 'escalated a ticket',
    details: 'Priority changed to HIGH - Urgent',
    time: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    id: 5,
    type: 'call',
    user: 'Customer Support',
    action: 'made a call',
    details: 'Follow-up call to Jane Smith',
    time: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    icon: Phone,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  }
]

export function ActivityFeed() {
  const [filter, setFilter] = useState('all')
  const router = useRouter()

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter)

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          Recent Activity
        </h2>
        <div className="flex space-x-2">
          {['all', 'message', 'resolved', 'escalated'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-xs rounded-full capitalize transition-all ${
                filter === type
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-400/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => router.push('/conversations')}
            className="w-full flex items-start space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm text-left"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <activity.icon className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white truncate">
                  {activity.user}{' '}
                  <span className="font-normal text-gray-400">
                    {activity.action}
                  </span>
                </p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {activity.details}
              </p>
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={() => router.push('/conversations')}
        className="w-full mt-4 py-2 text-sm text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors border border-white/10"
      >
        View all activity →
      </button>
    </div>
  )
}