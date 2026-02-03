import { generateGeminiResponse, geminiModel, AI_MODEL, TEMPERATURE_BALANCED } from './openai'
import { SYSTEM_PROMPTS, USER_PROMPTS } from './prompts'

export interface ResponseSuggestion {
  brief: string
  detailed: string
  empathetic: string
}

export interface QuickReply {
  text: string
  category: 'greeting' | 'question' | 'solution' | 'followup'
}

export async function generateResponseSuggestions(
  customerMessage: string,
  conversationHistory?: Array<{role: string; content: string}>
): Promise<ResponseSuggestion> {
  try {
    const historyText = conversationHistory
      ?.map(m => `${m.role}: ${m.content}`)
      .join('\n')

    const content = await generateGeminiResponse(
      [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.customerSupport,
        },
        {
          role: 'user',
          content: USER_PROMPTS.generateResponse(
            customerMessage,
            historyText
          ),
        },
      ],
      TEMPERATURE_BALANCED
    ).catch(() => '')
    
    // Parse the response to extract different suggestion types
    const lines = content.split('\n').filter(line => line.trim())
    
    return {
      brief: lines[0] || 'Thank you for reaching out.',
      detailed: lines[1] || content,
      empathetic: lines[2] || 'I understand your concern and I\'m here to help.',
    }
  } catch (error) {
    console.error('Suggestion generation error:', error)
    return {
      brief: 'Thank you for your message.',
      detailed: 'Thank you for contacting us. Let me look into this for you.',
      empathetic: 'I appreciate you bringing this to our attention.',
    }
  }
}

export async function generateQuickReplies(
  message: string
): Promise<QuickReply[]> {
  try {
    const responseText = await generateGeminiResponse(
      [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.quickReply + '\nReturn response as JSON object with "replies" array.',
        },
        {
          role: 'user',
          content: USER_PROMPTS.quickReplies(message),
        },
      ],
      TEMPERATURE_BALANCED
    ).catch(() => '[]')

    const result = JSON.parse(responseText)
    
    return Array.isArray(result) ? result : result.replies || []
  } catch (error) {
    console.error('Quick replies generation error:', error)
    return [
      { text: 'Thank you for reaching out', category: 'greeting' },
      { text: 'Let me check that for you', category: 'question' },
      { text: 'I\'ll help you with this', category: 'solution' },
    ]
  }
}

export async function summarizeConversation(
  messages: Array<{role: string; content: string}>
): Promise<string> {
  try {
    return await generateGeminiResponse(
      [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.summarize,
        },
        {
          role: 'user',
          content: USER_PROMPTS.summarizeConversation(messages),
        },
      ],
      TEMPERATURE_BALANCED
    ).catch(() => 'No summary available')
  } catch (error) {
    console.error('Conversation summary error:', error)
    return 'Unable to generate summary'
  }
}
