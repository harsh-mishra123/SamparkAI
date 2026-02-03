import { NextRequest, NextResponse } from 'next/server'
import { generateGeminiResponse, TEMPERATURE_BALANCED } from '@/lib/ai/openai'
import { SYSTEM_PROMPTS } from '@/lib/ai/prompts'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { conversationId, message, conversationHistory = [] } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build conversation history for AI
    const currentDate = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long'
    })
    
    const chatHistory: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.customerSupport + `\n\nYou are Sampark AI, a helpful customer support assistant. Be friendly, professional, and concise in your responses.\n\nCurrent date and time: ${currentDate}\nWhen users ask for the time, provide the current time based on this information.`,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      }
    ]

    // Generate AI response
    const aiMessage = await generateGeminiResponse(
      chatHistory,
      TEMPERATURE_BALANCED
    ).catch((error) => {
      console.error('Gemini API error:', error)
      return 'I apologize, but I am unable to generate a response at this moment. Please make sure the GOOGLE_API_KEY is configured correctly.'
    })

    return NextResponse.json({
      response: aiMessage,
      conversationContext: {
        conversationId,
        messageCount: conversationHistory.length + 1,
      },
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response. Please check your API configuration.' },
      { status: 500 }
    )
  }
}
