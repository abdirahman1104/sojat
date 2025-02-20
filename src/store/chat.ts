import { create } from 'zustand'
import { Message } from '@/types/chat'
import { Language } from '@/config/api'

interface ChatState {
  messages: Message[]
  language: Language
  isLoading: boolean
  streamingId: string | null
  error: string | null
  setLanguage: (language: Language) => void
  addMessage: (content: string, role: 'user' | 'assistant') => void
  setMessages: (messages: Message[]) => void
  setIsLoading: (isLoading: boolean) => void
  setStreamingId: (id: string | null) => void
  setError: (error: string | null) => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  clearError: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  language: 'en',
  isLoading: false,
  streamingId: null,
  error: null,
  
  setLanguage: (language) => set({ language }),

  addMessage: (content: string, role: 'user' | 'assistant') => {
    const message: Message = {
      id: Math.random().toString(36).substring(7),
      content,
      role,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      messages: [...state.messages, message],
    }))
  },

  setMessages: (messages) => set({ messages }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setStreamingId: (streamingId) => set({ streamingId }),
  setError: (error) => set({ error }),

  sendMessage: async (content: string) => {
    const state = get()
    set({ isLoading: true, error: null })

    try {
      // Add user message
      const userMessage: Message = {
        id: Math.random().toString(36).substring(7),
        content,
        role: 'user',
        createdAt: new Date().toISOString(),
      }
      set((state) => ({ messages: [...state.messages, userMessage] }))

      // Create streaming message
      const streamingId = Math.random().toString(36).substring(7)
      set({ streamingId })

      // TODO: Implement actual API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add AI response
      const aiMessage: Message = {
        id: streamingId,
        content: 'This is a placeholder response.',
        role: 'assistant',
        createdAt: new Date().toISOString(),
      }
      set((state) => ({ 
        messages: [...state.messages, aiMessage],
        streamingId: null,
      }))
    } catch (error) {
      set({ error: (error as Error).message })
    } finally {
      set({ isLoading: false })
    }
  },

  clearMessages: () => set({ messages: [], error: null }),
  clearError: () => set({ error: null }),
}))

// Helper function to get user-friendly error message
function getUserFriendlyError(error: any): string {
  if (error?.message?.includes('429')) {
    return 'The AI service is currently at capacity. Please try again in a few minutes.'
  }
  if (error?.message?.includes('401')) {
    return 'There was an authentication error. Please check your API configuration.'
  }
  if (error?.message?.includes('503')) {
    return 'The AI service is temporarily unavailable. Please try again in a few minutes.'
  }
  return error?.message || 'An unexpected error occurred. Please try again.'
}

// Initialize store with saved messages only in browser environment
if (typeof window !== 'undefined') {
  try {
    const savedMessages = localStorage.getItem('chat-messages')
    if (savedMessages) {
      const messages = JSON.parse(savedMessages)
      useChatStore.setState({ messages })
    }

    // Save messages to localStorage when they change
    useChatStore.subscribe(
      (state) => state.messages,
      (messages) => {
        if (messages.length > 0) {
          localStorage.setItem('chat-messages', JSON.stringify(messages))
        } else {
          localStorage.removeItem('chat-messages')
        }
      }
    )
  } catch (error) {
    console.error('Error handling local storage:', error)
  }
}
