import { NextRequest } from 'next/server'
import { apiConfig, Message } from '@/config/api'
import { createChatCompletion } from '@/lib/palm'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { messages, languageId = apiConfig.defaultLanguage.id } = await req.json()
    
    // Debug logging
    console.log('Received request:', {
      languageId,
      messageCount: messages?.length
    })

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: {
            message: 'Messages are required and must be an array',
          },
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Get chat completion from PaLM
    const response = await createChatCompletion(messages, languageId)
    return response

  } catch (error: any) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({
        error: {
          message: error.message || 'An unexpected error occurred',
        },
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
