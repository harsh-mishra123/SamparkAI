import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { summarizeConversation } from '@/lib/ai/suggestions'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const summary = await summarizeConversation(messages)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Conversation summary error:', error)
    return NextResponse.json(
      { error: 'Failed to summarize conversation' },
      { status: 500 }
    )
  }
}
