'use client'

import { useSession } from 'next-auth/react'
import { ChatContainer } from '@/components/chat/chat-container'
import { LoadingSpinner } from '@/components/ui/loading'

interface ChatPageProps {
  params: {
    chatId: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner className="h-8 w-8 sm:h-12 sm:w-12" />
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex h-full">
      <ChatContainer chatId={params.chatId} />
    </div>
  )
}
