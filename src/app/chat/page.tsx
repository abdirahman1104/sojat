"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { LoadingSpinner } from '@/components/ui/loading'

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface Chat {
  id: string
  title: string
  messages: Message[]
}

export default function ChatPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to a new chat if accessed directly
    const chatId = Date.now().toString()
    router.replace(`/chat/${chatId}`)
  }, [router])

  const [selectedModel, setSelectedModel] = React.useState("gpt-4")
  const [chats, setChats] = React.useState<Chat[]>([
    {
      id: "1",
      title: "First Chat",
      messages: [],
    },
  ])
  const [selectedChat, setSelectedChat] = React.useState<string>("1")
  const [isLoading, setIsLoading] = React.useState(false)

  const currentChat = chats.find((chat) => chat.id === selectedChat)

  const handleSubmit = async (content: string) => {
    if (!currentChat) return

    // Generate a random ID for now - we'll use proper UUIDs later
    const id = Math.random().toString(36).substring(7)
    
    // Add user message
    const userMessage: Message = {
      id,
      role: "user",
      content,
    }

    // Update the current chat's messages
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
            }
          : chat
      )
    )

    setIsLoading(true)

    // Simulate AI response - we'll implement real API calls later
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: `This is a simulated response from ${selectedModel}. API integration coming soon!`,
      }
      
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChat
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
              }
            : chat
        )
      )
      setIsLoading(false)
    }, 1000)
  }

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Math.random().toString(36).substring(7),
      title: "New Chat",
      messages: [],
    }
    setChats((prev) => [...prev, newChat])
    setSelectedChat(newChat.id)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onNewChat={handleNewChat}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader
          onNewChat={handleNewChat}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        <div className="flex-1 overflow-auto">
          <ChatMessages
            messages={currentChat?.messages ?? []}
            isLoading={isLoading}
          />
        </div>
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
