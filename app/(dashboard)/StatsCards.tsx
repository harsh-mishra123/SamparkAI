'use client'

import { MessageSquare, Users, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

const statsData = [
  {
    title: 'Total Conversations',
    value: '1,248',
    change: '+12%',
    icon: MessageSquare,
    color: 'bg-blue-500',
    trend: 'up'
  },
  {
    title: 'Active Customers',
    value: '892',
    change: '+5%',
    icon: Users,
    color: 'bg-green-500',
    trend: 'up'
  },
  {
    title: 'Avg Response Time',
    value: '4.2m',
    change: '-18%',
    icon: Clock,
    color: 'bg-purple-500',
    trend: 'down'
  },
  {
    title: 'Satisfaction Score',
    value: '94%',
    change: '+3%',
    icon: TrendingUp,
    color: 'bg-orange-500',
    trend: 'up'
  },
  {
    title: 'Pending Issues',
    value: '23',
    change: '-8%',
    icon: AlertCircle,
    color: 'bg-red-500',
    trend: 'down'
  },
  {
    title: 'Resolved Today',
    value: '156',
    change: '+24%',
    icon: CheckCircle,
    color: 'bg-teal-500',
    trend: 'up'
  }
]

export function StatsCards() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl p-6">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  )
}