import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { ChatCompletionRequestMessage } from 'openai'
import { palmChat } from '@/lib/palm'

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { messages } = await req.json()
    
    if (!messages || !Array.isArray(messages)) {
      return new NextResponse('Invalid request', { status: 400 })
    }

    const response = await palmChat(messages as ChatCompletionRequestMessage[])
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('[CHAT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
