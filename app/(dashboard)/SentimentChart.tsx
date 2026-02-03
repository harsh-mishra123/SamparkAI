'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useState } from 'react'

const sentimentData = [
  { hour: '9 AM', positive: 85, neutral: 10, negative: 5 },
  { hour: '10 AM', positive: 78, neutral: 15, negative: 7 },
  { hour: '11 AM', positive: 82, neutral: 12, negative: 6 },
  { hour: '12 PM', positive: 88, neutral: 8, negative: 4 },
  { hour: '1 PM', positive: 75, neutral: 18, negative: 7 },
  { hour: '2 PM', positive: 80, neutral: 14, negative: 6 },
  { hour: '3 PM', positive: 83, neutral: 12, negative: 5 },
  { hour: '4 PM', positive: 79, neutral: 16, negative: 5 },
  { hour: '5 PM', positive: 86, neutral: 10, negative: 4 },
]

const channelData = [
  { name: 'Email', value: 45, color: '#3b82f6' },
  { name: 'Chat', value: 25, color: '#10b981' },
  { name: 'Phone', value: 15, color: '#8b5cf6' },
  { name: 'Social', value: 10, color: '#f59e0b' },
  { name: 'WhatsApp', value: 5, color: '#06b6d4' },
]

export function SentimentChart() {
  const [timeRange, setTimeRange] = useState('today')

  const totalPositive = sentimentData.reduce((sum, data) => sum + data.positive, 0)
  const totalNegative = sentimentData.reduce((sum, data) => sum + data.negative, 0)
  const avgSentiment = ((totalPositive / (totalPositive + totalNegative)) * 100).toFixed(1)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Customer Sentiment
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time sentiment analysis
          </p>
        </div>
        <div className="flex space-x-2">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-lg capitalize ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Legend */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Positive</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Neutral</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Negative</span>
              </div>
            </div>

            {/* Chart Bars */}
            <div className="space-y-2">
              {sentimentData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 text-sm text-gray-500">{data.hour}</div>
                  <div className="flex-1 h-8 flex rounded-lg overflow-hidden">
                    <div 
                      className="bg-green-500 transition-all duration-300"
                      style={{ width: `${data.positive}%` }}
                      title={`Positive: ${data.positive}%`}
                    ></div>
                    <div 
                      className="bg-gray-400 transition-all duration-300"
                      style={{ width: `${data.neutral}%` }}
                      title={`Neutral: ${data.neutral}%`}
                    ></div>
                    <div 
                      className="bg-red-500 transition-all duration-300"
                      style={{ width: `${data.negative}%` }}
                      title={`Negative: ${data.negative}%`}
                    ></div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="text-sm font-medium">
                      {data.positive}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Overall Sentiment */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Sentiment
              </span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {avgSentiment}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Positive interactions
            </div>
          </div>

          {/* Channel Distribution */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Channel Distribution
            </h3>
            <div className="space-y-3">
              {channelData.map((channel, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: channel.color }}
                    ></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {channel.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</span>
              <span className="text-sm font-medium text-green-600">4.2m ↓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">First Contact Resolution</span>
              <span className="text-sm font-medium text-green-600">82% ↑</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Escalation Rate</span>
              <span className="text-sm font-medium text-red-600">8% ↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}