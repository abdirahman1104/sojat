import { z } from 'zod'

// Environment variables schema
const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "Gemini API key is required"),
  RATE_LIMIT_REQUESTS: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
})

// Language configuration
export const languages = {
  en: {
    name: 'English',
    code: 'en',
    flag: '🇺🇸'
  },
  so: {
    name: 'Somali',
    code: 'so',
    flag: '🇸🇴'
  }
} as const

export type Language = keyof typeof languages

export const models = {
  'gpt-4': {
    name: 'GPT-4',
    provider: 'openai',
    maxTokens: 8192
  },
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    maxTokens: 4096
  },
  'claude-2': {
    name: 'Claude 2',
    provider: 'anthropic',
    maxTokens: 100000
  },
  'claude-instant-1': {
    name: 'Claude Instant',
    provider: 'anthropic',
    maxTokens: 100000
  },
  'palm-2': {
    name: 'PaLM 2',
    provider: 'google',
    maxTokens: 8192
  },
  'command-nightly': {
    name: 'Command Nightly',
    provider: 'cohere',
    maxTokens: 4096
  }
} as const

export type ModelId = keyof typeof models

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface ApiResponse<T> {
  data?: T
  error?: ApiError
}

// API Configuration
export const apiConfig = {
  defaultLanguage: languages.en,
  languages,
  models,
} as const

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  createdAt: string
  updatedAt: string
}

export interface ChatHistory {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  userId: string
  language: Language
  model: ModelId
}

// Server-side configuration
export const serverConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
} as const

export type ServerConfig = typeof serverConfig

export const validateServerConfig = (config: ServerConfig): void => {
  const missingEnvVars = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    )
  }
}

export function getServerConfig() {
  try {
    // Debug logging
    console.log('Loading environment variables...')
    
    const env = envSchema.parse({
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      RATE_LIMIT_REQUESTS: process.env.RATE_LIMIT_REQUESTS || 100,
      RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 60000,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    })

    if (!env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is required')
    }

    // Debug logging
    console.log('Environment variables loaded successfully')
    
    validateServerConfig(serverConfig)

    return {
      rateLimit: {
        requests: env.RATE_LIMIT_REQUESTS,
        windowMs: env.RATE_LIMIT_WINDOW_MS,
      },
      serverConfig,
    }
  } catch (error) {
    console.error('Error loading environment variables:', error)
    
    if (error instanceof Error) {
      throw new Error(`Failed to load environment variables: ${error.message}`)
    }
    
    throw new Error('Failed to load environment variables: Unknown error')
  }
}
