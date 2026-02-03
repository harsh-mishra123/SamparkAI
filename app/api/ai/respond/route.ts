import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateGeminiResponse, AI_MODEL_FAST, TEMPERATURE_BALANCED } from '@/lib/ai/openai'
import { SYSTEM_PROMPTS } from '@/lib/ai/prompts'

// Webhook endpoint for customer messages (no auth required - for external integrations)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { conversationId, customerMessage, autoRespond = false } = body

    if (!conversationId || !customerMessage) {
      return NextResponse.json(
        { error: 'Conversation ID and message are required' },
        { status: 400 }
      )
    }

    // Get conversation with context
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        customer: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    // Save customer message
    const savedMessage = await prisma.message.create({
      data: {
        conversationId,
        content: customerMessage,
        senderType: 'CUSTOMER',
      },
    })

    // If auto-respond is enabled, generate AI response
    let aiResponse = null
    if (autoRespond) {
      const conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = conversation.messages
        .reverse()
        .map((msg) => ({
          role: msg.senderType === 'CUSTOMER' ? ('user' as const) : ('assistant' as const),
          content: msg.content,
        }))

      conversationHistory.push({
        role: 'user',
        content: customerMessage,
      })

      const aiMessageContent = await generateGeminiResponse(
        [
          {
            role: 'system',
            content: `${SYSTEM_PROMPTS.customerSupport}\n\nYou are assisting ${conversation.customer.name || 'a customer'} from ${conversation.customer.company || 'their company'}.\nTopic: ${conversation.subject || 'General Support'}`,
          },
          ...conversationHistory,
        ],
        TEMPERATURE_BALANCED
      ).catch(() => 'Thank you for your message. A support agent will assist you shortly.')

      // Save AI response
      aiResponse = await prisma.message.create({
        data: {
          conversationId,
          content: aiMessageContent,
          senderType: 'AI',
          metadata: {
            model: AI_MODEL_FAST,
            temperature: TEMPERATURE_BALANCED,
          },
        },
      })

      // Update conversation timestamp
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      })
    }

    return NextResponse.json({
      success: true,
      customerMessage: savedMessage,
      aiResponse: aiResponse
        ? {
            id: aiResponse.id,
            content: aiResponse.content,
            createdAt: aiResponse.createdAt,
          }
        : null,
    })
  } catch (error) {
    console.error('Customer message webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to process customer message' },
      { status: 500 }
    )
  }
}

// Get AI-suggested response without saving
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      )
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        customer: true,
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 10,
        },
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]
    if (!lastMessage || lastMessage.senderType !== 'CUSTOMER') {
      return NextResponse.json(
        { error: 'No customer message to respond to' },
        { status: 400 }
      )
    }

    const conversationHistory = conversation.messages.map((msg) => ({
      role: (msg.senderType === 'CUSTOMER' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: msg.content,
    }))

    const suggestion = await generateGeminiResponse(
      [
        {
          role: 'system' as const,
          content: SYSTEM_PROMPTS.customerSupport,
        },
        ...conversationHistory,
      ],
      TEMPERATURE_BALANCED
    ).catch(() => 'I recommend responding with empathy and offering specific help.')

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error('AI suggestion error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestion' },
      { status: 500 }
    )
  }
}
