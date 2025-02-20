'use client'

import { useRouter } from 'next/navigation'
import { ChatSidebar } from './chat-sidebar'
import { useEffect, useState } from 'react'

export function ChatSidebarContainer() {
  const router = useRouter()
  const [chats, setChats] = useState<{ id: string; title: string }[]>([])
  const [selectedChat, setSelectedChat] = useState<string>()

  // Initialize with a default chat
  useEffect(() => {
    if (chats.length === 0) {
      handleNewChat()
    }
  }, [])

  // For now, we'll just create a new chat with a timestamp ID
  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat'
    }
    setChats(prev => [...prev, newChat])
    setSelectedChat(newChat.id)
    router.push(`/chat/${newChat.id}`)
  }

  const handleSelectChat = (id: string) => {
    setSelectedChat(id)
    router.push(`/chat/${id}`)
  }

  return (
    <ChatSidebar
      chats={chats}
      selectedChat={selectedChat}
      onSelectChat={handleSelectChat}
      onNewChat={handleNewChat}
    />
  )
}
