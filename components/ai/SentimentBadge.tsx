'use client'

import { getSentimentColor, getSentimentBgColor, type Sentiment } from '@/lib/ai/sentiment'
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react'

interface SentimentBadgeProps {
  sentiment: Sentiment
  score?: number
  size?: 'sm' | 'md' | 'lg'
}

const sentimentIcons = {
  POSITIVE: TrendingUp,
  NEUTRAL: Minus,
  NEGATIVE: TrendingDown,
  URGENT: AlertTriangle,
}

const sentimentLabels = {
  POSITIVE: 'Positive',
  NEUTRAL: 'Neutral',
  NEGATIVE: 'Negative',
  URGENT: 'Urgent',
}

export default function SentimentBadge({ 
  sentiment, 
  score,
  size = 'md' 
}: SentimentBadgeProps) {
  const Icon = sentimentIcons[sentiment]
  const label = sentimentLabels[sentiment]
  const color = getSentimentColor(sentiment)
  const bgColor = getSentimentBgColor(sentiment)

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]}`}
      style={{ 
        color,
        backgroundColor: bgColor,
      }}
    >
      <Icon className={iconSizes[size]} />
      <span>{label}</span>
      {score !== undefined && (
        <span className="opacity-75">
          {Math.round(score * 100)}%
        </span>
      )}
    </div>
  )
}
