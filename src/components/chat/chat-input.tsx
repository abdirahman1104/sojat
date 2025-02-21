'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SendIcon } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSend(message.trim())
      setMessage('')
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'inherit'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  return (
    <div className="w-full max-w-5xl px-4 pb-8 pt-4">
      <form onSubmit={handleSubmit} className="relative flex items-end gap-2 rounded-xl border bg-background p-4 shadow-lg">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="min-h-[60px] max-h-[200px] resize-none bg-transparent px-3 py-2.5 text-base outline-none disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!message.trim() || isLoading}
          className="h-[60px] w-[60px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
        </Button>
      </form>
      <div className="mt-2 text-center text-xs text-muted-foreground">
        Sojat can make mistakes. Consider checking important information.
      </div>
    </div>
  )
}
