import OpenAI from 'openai'
import { ApiResponse } from '@/config/api'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  content: string
  model: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export async function chatCompletion(
  messages: ChatMessage[],
  model: string
): Promise<ApiResponse<ChatResponse>> {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    })

    return {
      data: {
        content: completion.choices[0]?.message?.content || '',
        model: completion.model,
        usage: completion.usage ? {
          promptTokens: completion.usage.prompt_tokens,
          completionTokens: completion.usage.completion_tokens,
          totalTokens: completion.usage.total_tokens
        } : undefined
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: { message: error.message } }
    }
    return { error: { message: 'An unknown error occurred' } }
  }
}
