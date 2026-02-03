'use client'

import { StatsCards } from '@/components/dashboard/StatsCards'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { SentimentChart } from '@/components/dashboard/SentimentChart'
import { ResponseTimeChart } from '@/components/dashboard/ResponseTimeChart'
import { CustomerJourney } from '@/components/dashboard/CustomerJourney'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { useUser } from '@clerk/nextjs'

export default function DashboardPage() {
  const { user } = useUser()
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your support team today.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-gray-300">Live Updates</span>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SentimentChart />
          <ResponseTimeChart />
        </div>
        <div className="space-y-6">
          <ActivityFeed />
          <QuickActions />
        </div>
      </div>

      {/* Customer Journey */}
      <CustomerJourney />
    </div>
  )
}