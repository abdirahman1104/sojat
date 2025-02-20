'use client'

import * as React from "react"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { LoadingSpinner } from "@/components/ui/loading"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    },
  })

  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  const handleSubmit = async (content: string) => {
    setIsLoading(true)
    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
      }
      setMessages(prev => [...prev, userMessage])

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "AI response will be implemented soon!",
      }
      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader title="New Chat" />
      <div className="flex-1 overflow-auto">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <div className="border-t p-4">
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
