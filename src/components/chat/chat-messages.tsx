'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/types'
import { ChatMessage } from './chat-message'

interface ChatMessagesProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          No messages yet. Start a conversation!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 py-6">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          isLast={index === messages.length - 1}
        />
      ))}
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
