'use client'

import { Mail, MessageSquare, Phone, ShoppingBag, ThumbsUp, Award } from 'lucide-react'
import { useState } from 'react'

const journeyStages = [
  {
    stage: 'Discovery',
    icon: ShoppingBag,
    customers: 1000,
    conversion: '100%',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    description: 'Visited website or store'
  },
  {
    stage: 'First Contact',
    icon: Mail,
    customers: 650,
    conversion: '65%',
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    description: 'Made initial inquiry'
  },
  {
    stage: 'Support',
    icon: MessageSquare,
    customers: 520,
    conversion: '52%',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    description: 'Engaged with support'
  },
  {
    stage: 'Resolution',
    icon: Phone,
    customers: 480,
    conversion: '48%',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'Issue resolved'
  },
  {
    stage: 'Satisfaction',
    icon: ThumbsUp,
    customers: 450,
    conversion: '45%',
    color: 'text-teal-500',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    description: 'Positive feedback'
  },
  {
    stage: 'Advocacy',
    icon: Award,
    customers: 320,
    conversion: '32%',
    color: 'text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    description: 'Became repeat customer'
  }
]

const recentJourneys = [
  {
    customer: 'Alex Johnson',
    company: 'TechCorp Inc.',
    path: 'Website → Email → Chat → Resolved',
    time: '2 hours',
    sentiment: 'Positive'
  },
  {
    customer: 'Maria Garcia',
    company: 'Global Retail',
    path: 'Phone → Email → Callback → Resolved',
    time: '4 hours',
    sentiment: 'Positive'
  },
  {
    customer: 'David Kim',
    company: 'StartupXYZ',
    path: 'Chat → Escalated → Engineering → Pending',
    time: '1 day',
    sentiment: 'Neutral'
  },
  {
    customer: 'Sarah Williams',
    company: 'Enterprise Co.',
    path: 'Email → Quick Response → Resolved',
    time: '30 minutes',
    sentiment: 'Very Positive'
  }
]

export function CustomerJourney() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Customer Journey
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Conversion funnel and customer paths
          </p>
        </div>
        <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last quarter</option>
        </select>
      </div>

      {/* Journey Funnel */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {journeyStages.map((stage, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative flex-1"
              onMouseEnter={() => setSelectedStage(index)}
              onMouseLeave={() => setSelectedStage(null)}
            >
              {/* Connection Line */}
              {index < journeyStages.length - 1 && (
                <div className="hidden md:block absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-700 -z-10"></div>
              )}

              {/* Stage Circle */}
              <div className={`p-4 rounded-full ${stage.bgColor} mb-3 relative`}>
                <stage.icon className={`w-6 h-6 ${stage.color}`} />
                {selectedStage === index && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {stage.customers} customers
                  </div>
                )}
              </div>

              {/* Stage Info */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {stage.stage}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stage.conversion}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stage.customers}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Conversion Metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              32%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Overall Conversion
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              2.4
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Touchpoints
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              18h
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Journey Time
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              $2.5K
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Customer Value
            </div>
          </div>
        </div>
      </div>

      {/* Recent Journeys */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Recent Customer Journeys
        </h3>
        <div className="space-y-3">
          {recentJourneys.map((journey, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {journey.customer}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {journey.company}
                </div>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {journey.path}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{journey.time}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  journey.sentiment === 'Very Positive' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : journey.sentiment === 'Positive'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {journey.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}