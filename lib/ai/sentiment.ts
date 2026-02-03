import { generateGeminiResponse, AI_MODEL_FAST, TEMPERATURE_PRECISE } from './openai'
import { SYSTEM_PROMPTS, USER_PROMPTS } from './prompts'

export type Sentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT'

export interface SentimentAnalysis {
  sentiment: Sentiment
  confidence: number
  reason: string
}

export async function analyzeSentiment(
  message: string
): Promise<SentimentAnalysis> {
  try {
    const responseText = await generateGeminiResponse(
      [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.sentiment + '\nReturn response as JSON with fields: sentiment, confidence, reason',
        },
        {
          role: 'user',
          content: USER_PROMPTS.analyzeSentiment(message),
        },
      ],
      TEMPERATURE_PRECISE
    ).catch(() => '{}')

    const result = JSON.parse(responseText)

    return {
      sentiment: result.sentiment as Sentiment,
      confidence: result.confidence || 0,
      reason: result.reason || '',
    }
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return {
      sentiment: 'NEUTRAL',
      confidence: 0,
      reason: 'Error analyzing sentiment',
    }
  }
}

export function getSentimentColor(sentiment: Sentiment): string {
  switch (sentiment) {
    case 'POSITIVE':
      return 'text-green-500'
    case 'NEUTRAL':
      return 'text-blue-500'
    case 'NEGATIVE':
      return 'text-orange-500'
    case 'URGENT':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export function getSentimentBgColor(sentiment: Sentiment): string {
  switch (sentiment) {
    case 'POSITIVE':
      return 'bg-green-500/10 border-green-500/30'
    case 'NEUTRAL':
      return 'bg-blue-500/10 border-blue-500/30'
    case 'NEGATIVE':
      return 'bg-orange-500/10 border-orange-500/30'
    case 'URGENT':
      return 'bg-red-500/10 border-red-500/30'
    default:
      return 'bg-gray-500/10 border-gray-500/30'
  }
}
