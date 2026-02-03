import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { generateResponseSuggestions, generateQuickReplies } from '@/lib/ai/suggestions'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { message, conversationHistory, type = 'suggestions' } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (type === 'quick-replies') {
      const quickReplies = await generateQuickReplies(message)
      return NextResponse.json({ quickReplies })
    }

    const suggestions = await generateResponseSuggestions(
      message,
      conversationHistory
    )

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('AI suggestion error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}
