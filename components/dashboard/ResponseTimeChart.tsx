'use client'

import { TrendingDown, Zap } from 'lucide-react'
import { useState } from 'react'

const responseTimeData = [
  { day: 'Mon', email: 15, chat: 3, phone: 8 },
  { day: 'Tue', email: 12, chat: 2, phone: 6 },
  { day: 'Wed', email: 18, chat: 4, phone: 10 },
  { day: 'Thu', email: 10, chat: 2, phone: 5 },
  { day: 'Fri', email: 14, chat: 3, phone: 7 },
  { day: 'Sat', email: 22, chat: 5, phone: 12 },
  { day: 'Sun', email: 25, chat: 6, phone: 15 },
]

export function ResponseTimeChart() {
  const [selectedChannel, setSelectedChannel] = useState('all')

  const avgEmailTime = (responseTimeData.reduce((sum, day) => sum + day.email, 0) / responseTimeData.length).toFixed(1)
  const avgChatTime = (responseTimeData.reduce((sum, day) => sum + day.chat, 0) / responseTimeData.length).toFixed(1)
  const avgPhoneTime = (responseTimeData.reduce((sum, day) => sum + day.phone, 0) / responseTimeData.length).toFixed(1)

  const maxValue = Math.max(
    ...responseTimeData.map(d => Math.max(d.email, d.chat, d.phone))
  )

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Response Times
          </h2>
          <p className="text-sm text-gray-400">
            Average response time by channel (minutes)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium text-green-400 flex items-center">
            <TrendingDown className="w-4 h-4 mr-1" />
            18% faster this week
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Channel Filter */}
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All Channels', color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
            { id: 'email', label: 'Email', color: 'bg-blue-500' },
            { id: 'chat', label: 'Chat', color: 'bg-green-500' },
            { id: 'phone', label: 'Phone', color: 'bg-purple-500' },
          ].map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedChannel === channel.id
                  ? `${channel.color} text-white shadow-md`
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {channel.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="flex items-end space-x-2 h-48">
          {responseTimeData.map((day, index) => {
            const emailHeight = (day.email / maxValue) * 100
            const chatHeight = (day.chat / maxValue) * 100
            const phoneHeight = (day.phone / maxValue) * 100

            return (
              <div key={index} className="flex-1 flex items-end space-x-1">
                {(selectedChannel === 'all' || selectedChannel === 'email') && (
                  <div
                    className="w-1/3 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${emailHeight}%` }}
                    title={`Email: ${day.email}m`}
                  ></div>
                )}
                {(selectedChannel === 'all' || selectedChannel === 'chat') && (
                  <div
                    className="w-1/3 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                    style={{ height: `${chatHeight}%` }}
                    title={`Chat: ${day.chat}m`}
                  ></div>
                )}
                {(selectedChannel === 'all' || selectedChannel === 'phone') && (
                  <div
                    className="w-1/3 bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
                    style={{ height: `${phoneHeight}%` }}
                    title={`Phone: ${day.phone}m`}
                  ></div>
                )}
              </div>
            )
          })}
        </div>

        {/* X-axis Labels */}
        <div className="flex justify-between text-sm text-gray-500">
          {responseTimeData.map((day, index) => (
            <div key={index} className="text-center w-1/7">
              {day.day}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {avgEmailTime}m
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {avgChatTime}m
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Live Chat</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {avgPhoneTime}m
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Phone</div>
          </div>
        </div>
      </div>
    </div>
  )
}