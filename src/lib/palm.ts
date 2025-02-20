import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { Message, languages } from '@/config/api'

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Configure the chat
const chatConfig = {
  model: 'gemini-pro',
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  },
}

// Format the response for better readability
function formatResponse(text: string, languageId: string): string {
  // Add proper markdown formatting
  let formatted = text
    // Ensure headers have proper spacing
    .replace(/\*\*(.*?)\*\*/g, '\n\n## $1\n\n')
    // Format subheadings
    .replace(/### (.*?)\\n/g, '\n\n### $1\n\n')
    // Format lists with proper spacing
    .replace(/^\* /gm, '\n* ')
    .replace(/(?<=\n\*.*)\n(?=\*)/g, '\n\n')
    // Add horizontal rules between major sections
    .replace(/\n## /g, '\n\n---\n\n## ')
    // Remove excessive newlines
    .replace(/\n{4,}/g, '\n\n\n')
    // Ensure proper paragraph spacing
    .replace(/\.\s+(?=[A-Z])/g, '.\n\n')
    
  // Add language-specific formatting
  if (languageId === 'so') {
    formatted = '# ' + (text.split('.')[0] || 'Jawaab') + '\n\n' + formatted
  } else {
    formatted = '# ' + (text.split('.')[0] || 'Response') + '\n\n' + formatted
  }

  return formatted.trim()
}

export async function createChatCompletion(messages: Message[], languageId: keyof typeof languages) {
  const language = languages[languageId]

  try {
    // Get the model
    const model = genAI.getGenerativeModel(chatConfig)

    // Start a chat
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        parts: [{ text: msg.content }],
      })),
    })

    // Add language context and formatting instructions
    const formatInstructions = `
Format your response using these rules:
1. Use "**" for section headers (e.g., **Introduction**)
2. Use proper spacing between sections
3. Use bullet points (*) for lists
4. Add a summary at the end
5. Keep paragraphs short and well-spaced
`

    const languageContext = languageId === 'so' 
      ? `Waxaad tahay AI caawiye ah oo ku hadla Af-Soomaali. ${formatInstructions}

Tusaale:
**Hordhac**
Qoraalka hordhaca ah...

**Qeybta 1**
* Qodob 1
* Qodob 2

**Gunaanad**
Fariinta ugu dambeysa...`
      : `You are a helpful AI assistant. ${formatInstructions}

Example:
**Introduction**
Introduction text...

**Section 1**
* Point 1
* Point 2

**Summary**
Final message...`

    // Send the message with language context
    const result = await chat.sendMessage(languageContext)
    const response = await result.response
    const formattedText = formatResponse(response.text(), languageId)

    return new Response(formattedText, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error: any) {
    console.error('Gemini API Error:', error)
    throw new Error(`Gemini API error: ${error.message}`)
  }
}
