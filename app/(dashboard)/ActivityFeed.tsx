'use client'

import { MessageSquare, UserPlus, CheckCircle, AlertTriangle, Phone, Mail } from 'lucide-react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

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

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <div className="flex space-x-2">
          {['all', 'message', 'resolved', 'escalated'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-xs rounded-full capitalize ${
                filter === type
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.user}{' '}
                  <span className="font-normal text-gray-600 dark:text-gray-400">
                    {activity.action}
                  </span>
                </p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {activity.details}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
        View all activity →
      </button>
    </div>
  )
}