import { cn } from '@/lib/utils'
import { Message } from '@/types/chat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 p-4 rounded-lg',
        message.role === 'user' ? 'bg-accent' : 'bg-muted'
      )}
    >
      <div
        className={cn(
          'rounded-full p-2 text-sm',
          message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
        )}
      >
        {message.role === 'user' ? 'You' : 'AI'}
      </div>
      <div className="flex-1 space-y-2">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: (props) => (
                <h1 className="text-2xl font-bold mb-4" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-xl font-semibold mb-3" {...props} />
              ),
              h3: (props) => (
                <h3 className="text-lg font-medium mb-2" {...props} />
              ),
              p: (props) => (
                <p className="mb-4" {...props} />
              ),
              ul: (props) => (
                <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
              ),
              li: (props) => (
                <li className="mb-1" {...props} />
              ),
              hr: (props) => (
                <hr className="my-4 border-t border-border" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className="text-xs text-muted-foreground">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
