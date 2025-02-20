import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Plus,
  Search,
  HelpCircle,
  SendHorizontal,
  ImageIcon,
  Paperclip,
  Loader2,
  Globe,
} from "lucide-react"
import { useChatStore } from "@/store/chat"
import { languages } from "@/config/api"

interface ChatInputProps {
  className?: string
}

export function ChatInput({ className }: ChatInputProps) {
  const [message, setMessage] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const { sendMessage, isLoading, language, setLanguage } = useChatStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      const currentMessage = message
      setMessage("")
      await sendMessage(currentMessage)
    }
  }

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "inherit"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  return (
    <div className="w-full max-w-5xl px-4 pb-8 pt-4">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex w-full flex-col gap-2 rounded-xl border bg-background p-4 shadow-lg",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setLanguage(language === 'en' ? 'so' : 'en')}
          >
            <Globe className="h-4 w-4" />
            <span className="ml-2 text-xs">{languages[language].name}</span>
          </Button>
        </div>
        
        <div className="flex items-end gap-3">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full hover:bg-accent/50"
            >
              <Plus className="h-5 w-5" />
            </Button>
            
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full hover:bg-accent/50"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full hover:bg-accent/50"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message Sojat..."
              rows={1}
              disabled={isLoading}
              className="w-full resize-none bg-transparent px-3 py-2.5 text-base outline-none disabled:opacity-50"
              style={{ maxHeight: "200px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full hover:bg-accent/50"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full hover:bg-accent/50"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || isLoading}
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SendHorizontal className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-2 text-center text-xs text-muted-foreground">
        Sojat can make mistakes. Consider checking important information.
      </div>
    </div>
  )
}
