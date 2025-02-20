export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  createdAt: string
}

export type ChatRole = Message['role']

export interface ChatRequest {
  messages: Message[]
  model: string
  language: string
}

export interface ChatResponse {
  id: string
  role: ChatRole
  content: string
  createdAt: string
}

export interface ErrorResponse {
  error: {
    message: string
    code: string
  }
}
