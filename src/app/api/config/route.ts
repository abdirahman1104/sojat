import { NextResponse } from 'next/server'
import { apiConfig } from '@/config/api'

export async function GET() {
  // Only send safe configuration to the client
  return NextResponse.json({
    models: apiConfig.openai.models,
    defaultModel: apiConfig.openai.defaultModel,
    languages: apiConfig.languages,
    defaultLanguage: apiConfig.defaultLanguage,
  })
}
