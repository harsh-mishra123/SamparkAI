'use client'

import { useEffect, useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Clock, 
  Star,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

interface AnalyticsData {
  overview: {
    totalConversations: number
    newConversations: number
    totalCustomers: number
    newCustomers: number
    totalMessages: number
    aiMessages: number
    avgMessages: string
    avgResponseTime: string
    satisfaction: number
  }
  distribution: {
    byStatus: Array<{ status: string; count: number }>
    byChannel: Array<{ channel: string; count: number }>
    byPriority: Array<{ priority: string; count: number }>
    sentiment: Record<string, number>
  }
  trends: {
    daily: Array<{ date: string; count: number }>
  }
}

const COLORS = {
  purple: '#a855f7',
  pink: '#ec4899',
  blue: '#3b82f6',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  cyan: '#06b6d4',
  indigo: '#6366f1'
}

const STATUS_COLORS: Record<string, string> = {
  OPEN: COLORS.blue,
  PENDING: COLORS.orange,
  RESOLVED: COLORS.green,
  CLOSED: COLORS.purple
}

const CHANNEL_COLORS: Record<string, string> = {
  EMAIL: COLORS.blue,
  CHAT: COLORS.green,
  WHATSAPP: COLORS.cyan,
  PHONE: COLORS.orange,
  SOCIAL: COLORS.pink
}

const SENTIMENT_COLORS: Record<string, string> = {
  POSITIVE: COLORS.green,
  NEUTRAL: COLORS.blue,
  NEGATIVE: COLORS.orange,
  URGENT: COLORS.red
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics/stats?days=${timeRange}`)
      const analytics = await res.json()
      setData(analytics)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    if (!data) return
    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  const sentimentData = Object.entries(data.distribution.sentiment).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Deep insights into your support performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Conversations"
          value={data.overview.totalConversations.toLocaleString()}
          change={data.overview.newConversations}
          icon={MessageSquare}
          color="purple"
        />
        <StatCard
          title="Total Customers"
          value={data.overview.totalCustomers.toLocaleString()}
          change={data.overview.newCustomers}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Avg Response Time"
          value={data.overview.avgResponseTime}
          change={-18}
          icon={Clock}
          color="green"
          isTime
        />
        <StatCard
          title="Satisfaction Score"
          value={`${data.overview.satisfaction}%`}
          change={3}
          icon={Star}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Trends */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Conversation Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.trends.daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e2e',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={COLORS.purple} 
                strokeWidth={2}
                dot={{ fill: COLORS.purple }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Channel Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.distribution.byChannel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="channel" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e2e',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill={COLORS.blue} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.distribution.byStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.distribution.byStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || COLORS.purple} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e2e',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sentiment Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name] || COLORS.blue} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e2e',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Messages</span>
            <MessageSquare className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{data.overview.totalMessages.toLocaleString()}</div>
          <div className="text-sm text-gray-400 mt-1">
            {data.overview.aiMessages.toLocaleString()} AI-generated
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Avg Messages/Conv</span>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{data.overview.avgMessages}</div>
          <div className="text-sm text-gray-400 mt-1">Per conversation</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">AI Automation Rate</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {((data.overview.aiMessages / data.overview.totalMessages) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-400 mt-1">Of total messages</div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: any
  color: string
  isTime?: boolean
}

function StatCard({ title, value, change, icon: Icon, color, isTime }: StatCardProps) {
  const isPositive = isTime ? change < 0 : change > 0
  
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/20`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {Math.abs(change)}{isTime ? '% faster' : ''}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  )
}