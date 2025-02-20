import { z } from 'zod'

// Environment variables schema
const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "Gemini API key is required"),
  RATE_LIMIT_REQUESTS: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
})

// Language configuration
export const languages = {
  so: {
    id: 'so',
    name: 'Somali',
    systemPrompt: 'Waxaad tahay AI caawiye ah oo ku hadla Af-Soomaali. Waa inaad ku jawaabto Af-Soomaali oo kaliya. Ha isticmaalin luqad kale. Isticmaal luqad fudud oo la fahmi karo.',
  },
  en: {
    id: 'en',
    name: 'English',
    systemPrompt: 'You will respond in English. Please use simple and clear language.',
  },
} as const

// API Configuration
export const apiConfig = {
  defaultLanguage: languages.en,
  languages,
} as const

export type Language = keyof typeof languages

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
}

// Server-side configuration
export function getServerConfig() {
  try {
    // Debug logging
    console.log('Loading environment variables...')
    
    const env = envSchema.parse({
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      RATE_LIMIT_REQUESTS: process.env.RATE_LIMIT_REQUESTS || 100,
      RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 60000,
    })

    if (!env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is required')
    }

    // Debug logging
    console.log('Environment variables loaded successfully')
    
    return {
      rateLimit: {
        requests: env.RATE_LIMIT_REQUESTS,
        windowMs: env.RATE_LIMIT_WINDOW_MS,
      },
    }
  } catch (error: any) {
    console.error('Error loading environment variables:', error)
    throw error
  }
}
