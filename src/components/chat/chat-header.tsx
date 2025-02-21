interface ChatHeaderProps {
  title: string
}

export function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800">
      <div className="container flex h-14 items-center px-4">
        <h2 className="text-lg font-medium">
          {title || 'New Chat'}
        </h2>
      </div>
    </header>
  )
}
