import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useChatStore } from '@/store/chat'
import { ChatMessage } from './chat-message'

interface ChatMessagesProps {
  className?: string
}

export function ChatMessages({ className }: ChatMessagesProps) {
  const { messages, isLoading, streamingId } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!messages.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
      </div>
    )
  }

  return (
    <div className={cn('flex-1 overflow-y-auto', className)}>
      <div className="container max-w-4xl py-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
          />
        ))}
        {isLoading && (
          <div className="animate-pulse">
            <ChatMessage
              message={{
                id: 'loading',
                role: 'assistant',
                content: 'Thinking...',
                createdAt: new Date().toISOString(),
              }}
            />
          </div>
        )}
        {streamingId && (
          <div className="animate-pulse opacity-70">
            <ChatMessage
              message={{
                id: streamingId,
                role: 'assistant',
                content: '...',
                createdAt: new Date().toISOString(),
              }}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
