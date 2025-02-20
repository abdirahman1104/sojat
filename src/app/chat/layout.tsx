'use client'

import { useSession } from 'next-auth/react'
import { ChatSidebarContainer } from '@/components/chat/chat-sidebar-container'
import { LoadingSpinner } from '@/components/ui/loading'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  return (
    <div className="flex h-screen">
      <ChatSidebarContainer />
      {children}
    </div>
  )
}
