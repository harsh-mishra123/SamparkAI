import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Missing GOOGLE_API_KEY environment variable')
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

// Export Gemini models
export const geminiModel = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash'
})
export const geminiModelFast = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash'
})

export const AI_MODEL = 'gemini-2.5-flash'
export const AI_MODEL_FAST = 'gemini-2.5-flash'

// Temperature settings
export const TEMPERATURE_CREATIVE = 0.8
export const TEMPERATURE_BALANCED = 0.5
export const TEMPERATURE_PRECISE = 0.2

// Helper function to convert OpenAI-style messages to Gemini format
export async function generateGeminiResponse(
  messages: Array<{ role: string; content: string }>,
  temperature: number = TEMPERATURE_BALANCED
) {
  const model = genAI.getGenerativeModel({ 
    model: AI_MODEL,
    generationConfig: {
      temperature,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  })

  // Convert messages to Gemini format
  const systemMessage = messages.find(m => m.role === 'system')
  const chatMessages = messages.filter(m => m.role !== 'system')

  const contents = chatMessages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  // Add system message as first user message if exists
  if (systemMessage) {
    contents.unshift({
      role: 'user',
      parts: [{ text: systemMessage.content }],
    })
  }

  const chat = model.startChat({
    history: contents.slice(0, -1),
  })

  const lastMessage = contents[contents.length - 1]
  const result = await chat.sendMessage(lastMessage.parts[0].text)
  const response = result.response
  
  return response.text()
}
