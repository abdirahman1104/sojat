import { Message } from '@/types/chat'

export async function streamChat(messages: Message[], model: string, language: string) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.map(({ id, content, role }) => ({
          content,
          role,
        })),
        model,
        language,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to send message')
    }

    if (!response.body) {
      throw new Error('No response body')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    return {
      stream: reader,
      cancel: () => reader.cancel(),
      async *iterateResponses() {
        try {
          while (true) {
            const { done, value } = await reader.read()
            
            if (done) {
              break
            }

            // Decode the stream chunk and yield the text
            const text = decoder.decode(value)
            if (text.trim()) {
              yield text
            }
          }
        } catch (error) {
          console.error('Error reading stream:', error)
          throw error
        } finally {
          reader.releaseLock()
        }
      },
    }
  } catch (error) {
    console.error('Error in streamChat:', error)
    throw error
  }
}
