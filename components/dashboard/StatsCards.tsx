'use client'

import { MessageSquare, Users, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const statsData = [
  {
    title: 'Total Conversations',
    value: '1,248',
    change: '+12%',
    icon: MessageSquare,
    color: 'bg-blue-500',
    trend: 'up',
    link: '/conversations'
  },
  {
    title: 'Active Customers',
    value: '892',
    change: '+5%',
    icon: Users,
    color: 'bg-green-500',
    trend: 'up',
    link: '/customers'
  },
  {
    title: 'Avg Response Time',
    value: '4.2m',
    change: '-18%',
    icon: Clock,
    color: 'bg-purple-500',
    trend: 'down',
    link: '/analytics'
  },
  {
    title: 'Satisfaction Score',
    value: '94%',
    change: '+3%',
    icon: TrendingUp,
    color: 'bg-orange-500',
    trend: 'up',
    link: '/analytics'
  },
  {
    title: 'Pending Issues',
    value: '23',
    change: '-8%',
    icon: AlertCircle,
    color: 'bg-red-500',
    trend: 'down',
    link: '/conversations'
  },
  {
    title: 'Resolved Today',
    value: '156',
    change: '+24%',
    icon: CheckCircle,
    color: 'bg-teal-500',
    trend: 'up',
    link: '/analytics'
  }
]

export function StatsCards() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      {statsData.map((stat, index) => (
        <button
          key={index}
          onClick={() => router.push(stat.link)}
          className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                <stat.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {stat.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}