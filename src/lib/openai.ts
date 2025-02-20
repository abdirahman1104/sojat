import OpenAI from 'openai'
import { serverConfig } from '@/config/api'

if (!serverConfig) {
  throw new Error('Server configuration is not available. Make sure environment variables are set.')
}

// Create OpenAI client instance
export const openai = new OpenAI({
  apiKey: serverConfig.openaiApiKey,
})

// Helper function to get system prompt based on language
export function getSystemPrompt(language: string) {
  const languagePrompt = language === 'so' 
    ? 'Waxaad ku jawaabaysaa Af-Soomaali. Fadlan isticmaal luuqad fudud oo la fahmi karo.'
    : 'You will respond in English. Please use simple and clear language.'

  return `You are a helpful AI assistant. ${languagePrompt}
- Be concise and clear in your responses
- If you don't know something, say so
- Avoid harmful or inappropriate content
- Format responses appropriately using markdown`
}

// Helper function to validate and prepare messages
export function prepareMessages(messages: any[], language: string) {
  // Add system message at the start if not present
  if (messages[0]?.role !== 'system') {
    messages.unshift({
      role: 'system',
      content: getSystemPrompt(language),
    })
  }

  return messages
}
