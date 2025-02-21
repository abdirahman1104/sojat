import { create } from 'zustand'
import { Message, Language, ModelId } from '@/config/api'

interface ChatState {
  messages: Message[]
  language: Language
  model: ModelId
  isLoading: boolean
  error: string | null
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  setLanguage: (language: Language) => void
  setModel: (model: ModelId) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearMessages: () => void
  clearError: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  language: 'en',
  model: 'gpt-3.5-turbo',
  isLoading: false,
  error: null,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message],
    error: null 
  })),
  setLanguage: (language) => set({ language }),
  setModel: (model) => set({ model }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ messages: [] }),
  clearError: () => set({ error: null })
}))
