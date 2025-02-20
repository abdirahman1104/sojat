import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  chats?: { id: string; title: string }[]
  selectedChat?: string
  onSelectChat: (id: string) => void
  onNewChat: () => void
  className?: string
}

export function ChatSidebar({
  chats = [],
  selectedChat,
  onSelectChat,
  onNewChat,
  className,
}: ChatSidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-[300px] flex-col border-r bg-muted/40",
        className
      )}
    >
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <PlusIcon className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {chats?.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
              selectedChat === chat.id && "bg-muted"
            )}
          >
            <ChatBubbleIcon className="mr-2 h-4 w-4" />
            <span className="line-clamp-1 flex-1 text-left">
              {chat.title || "New Chat"}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function ChatBubbleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
