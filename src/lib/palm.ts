import { ApiResponse } from '@/config/api'
import { ChatMessage } from './openai'

interface PaLMResponse {
  candidates: Array<{
    content: string
    safetyRatings: Array<{
      category: string
      probability: string
    }>
  }>
}

interface PaLMError {
  error: {
    code: number
    message: string
    status: string
  }
}

export async function palmChat(
  messages: ChatMessage[],
  modelId: string
): Promise<ApiResponse<{ content: string }>> {
  try {
    const prompt = messages.map(msg => msg.content).join('\n\n')
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta3/models/${modelId}:generateText`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PALM_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: {
            text: prompt,
          },
          temperature: 0.7,
          candidateCount: 1,
          maxOutputTokens: 1024,
        }),
      }
    )

    if (!response.ok) {
      const error = (await response.json()) as PaLMError
      throw new Error(error.error.message)
    }

    const data = (await response.json()) as PaLMResponse
    const content = data.candidates[0]?.content || ''

    return { data: { content } }
  } catch (error) {
    if (error instanceof Error) {
      return { error: { message: error.message } }
    }
    return { error: { message: 'An unknown error occurred' } }
  }
}
