'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading'
import { Session } from 'next-auth'

interface ExtendedSession extends Session {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function OnboardingPage() {
  const { data: session, status } = useSession() as { 
    data: ExtendedSession | null
    status: 'loading' | 'authenticated' | 'unauthenticated'
  }
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    async function checkExistingUser() {
      if (session?.user?.id) {
        try {
          const res = await fetch('/api/auth/check-user', {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: session.user.id }),
            method: 'POST'
          })
          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.error || 'Failed to check user status')
          }

          if (data.exists) {
            // User already exists, redirect to chat
            router.replace('/chat')
            return
          }
          
          // New user, show onboarding form
          setIsLoading(false)
        } catch (err: any) {
          console.error('Error checking user:', err)
          setError(err.message || 'Error checking user status')
          setIsLoading(false)
        }
      }
    }

    if (status === 'authenticated') {
      checkExistingUser()
    } else if (status === 'unauthenticated') {
      router.replace('/')
    }
  }, [session, status, router])

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner className="h-8 w-8 sm:h-12 sm:w-12" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!session?.user?.id || !session?.user?.email) {
      setError('Session data is missing. Please try signing in again.')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: session.user.id,
          username,
          email: session.user.email,
          name: session.user.name || ''
        })
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete signup')
      }

      // Redirect to chat page
      router.replace('/chat')
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'Failed to complete signup')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8 rounded-xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome to Sojat AI!
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Just one quick step to get started
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Choose a username
            </label>
            <Input
              id="username"
              type="text"
              required
              placeholder="e.g., john_doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-base sm:text-lg py-2 sm:py-3"
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_]+"
              title="Username can only contain letters, numbers, and underscores"
              disabled={isLoading}
            />
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              3-20 characters, letters, numbers, and underscores only
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 py-3 sm:py-4 text-base sm:text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Setting up...' : 'Start Chatting'}
          </Button>
        </form>
      </div>
    </div>
  )
}
