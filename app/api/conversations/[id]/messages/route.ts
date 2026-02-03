import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { analyzeSentiment } from '@/lib/ai/sentiment'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { content, senderType, analyzeWithAI = true } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      )
    }

    // Analyze sentiment for customer messages
    let metadata = {}
    if (senderType === 'CUSTOMER' && analyzeWithAI) {
      try {
        const sentimentResult = await analyzeSentiment(content)
        metadata = {
          sentiment: sentimentResult.sentiment,
          sentimentConfidence: sentimentResult.confidence,
          sentimentReason: sentimentResult.reason,
        }
      } catch (error) {
        console.error('Sentiment analysis failed:', error)
      }
    }

    const message = await prisma.message.create({
      data: {
        conversationId: id,
        content,
        senderType: senderType || 'AGENT',
        userId: senderType === 'AGENT' ? userId : undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    // Update conversation's updatedAt timestamp
    await prisma.conversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error('Failed to create message:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
