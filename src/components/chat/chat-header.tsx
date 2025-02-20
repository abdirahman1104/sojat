import { Button } from "@/components/ui/button"
import { Dropdown } from "@/components/ui/dropdown"

interface ChatHeaderProps {
  onNewChat?: () => void
  selectedModel: string
  onModelChange: (model: string) => void
}

const models = [
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "claude", label: "Claude" },
  { value: "deepseek", label: "DeepSeek" },
]

const languages = [
  { value: "so", label: "Somali" },
  { value: "en", label: "English" },
]

export function ChatHeader({
  onNewChat,
  selectedModel,
  onModelChange,
}: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-4xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Dropdown
            options={models}
            value={selectedModel}
            onChange={onModelChange}
            className="w-[180px]"
          />
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Language:</span>
            <Dropdown
              options={languages}
              defaultValue="so"
              className="w-[140px]"
            />
          </div>
        </div>
        <Button
          onClick={onNewChat}
          variant="ghost"
          size="sm"
          className="text-xs"
        >
          New Chat
        </Button>
      </div>
    </header>
  )
}
