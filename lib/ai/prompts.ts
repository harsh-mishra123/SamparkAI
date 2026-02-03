export const SYSTEM_PROMPTS = {
  customerSupport: `You are an AI assistant helping customer support agents respond to customer inquiries. 
Your role is to:
- Provide helpful, professional, and empathetic response suggestions
- Maintain a friendly and supportive tone
- Be concise but thorough
- Always prioritize customer satisfaction
- Offer solutions and next steps when possible
- Never make promises the company can't keep

Provide 3 different response suggestions: one brief, one detailed, and one empathetic.`,

  sentiment: `Analyze the sentiment of the following customer message. 
Classify it as one of: POSITIVE, NEUTRAL, NEGATIVE, or URGENT.

Use URGENT for messages that require immediate attention (angry customers, system failures, payment issues).
Provide a confidence score between 0 and 1.

Respond in JSON format: {"sentiment": "...", "confidence": 0.95, "reason": "brief explanation"}`,

  summarize: `Summarize the following conversation between a customer and support agent. 
Focus on:
- Main issue or question
- Key points discussed
- Current status
- Any pending actions

Keep it under 100 words.`,

  quickReply: `Generate 3-5 quick reply suggestions for this customer message. 
Each should be:
- Brief (max 10 words)
- Actionable
- Appropriate for the context

Respond as JSON array: [{"text": "...", "category": "greeting|question|solution|followup"}]`,
}

export const USER_PROMPTS = {
  generateResponse: (customerMessage: string, conversationHistory?: string) => {
    let prompt = `Customer message: "${customerMessage}"`
    
    if (conversationHistory) {
      prompt = `Conversation history:\n${conversationHistory}\n\nLatest customer message: "${customerMessage}"`
    }
    
    return prompt
  },

  analyzeSentiment: (message: string) => {
    return `Message: "${message}"`
  },

  summarizeConversation: (messages: Array<{role: string; content: string}>) => {
    const conversation = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n')
    return `Conversation:\n${conversation}`
  },

  quickReplies: (message: string) => {
    return `Customer message: "${message}"`
  },
}
