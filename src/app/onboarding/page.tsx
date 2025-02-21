'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading'

interface SignupError {
  error: string
}

interface UserCheckResponse {
  exists: boolean
}

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const checkExistingUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/check-user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        throw new Error('Failed to check user status')
      }

      const data = await res.json() as UserCheckResponse
      if (data.exists) {
        router.replace('/chat')
        return
      }
      
      setIsLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error checking user:', error)
        setError(error.message)
      } else {
        setError('Failed to verify user status')
      }
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/')
      return
    }

    if (status === 'authenticated' && session?.user?.id) {
      checkExistingUser()
    }
  }, [status, session, router, checkExistingUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          email: session?.user?.email
        }),
      })

      const data = await res.json() as SignupError
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete signup')
      }

      router.replace('/chat')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signup error:', error)
        setError(error.message)
      } else {
        setError('Failed to complete signup')
      }
      setIsSubmitting(false)
    }
  }

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Welcome to Sojat AI!
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300 sm:mt-3 sm:text-lg">
            Just one quick step to get started
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/50">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Choose a username
            </label>
            <Input
              id="username"
              type="text"
              required
              placeholder="e.g., john_doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 text-base sm:py-3 sm:text-lg"
              minLength={3}
              maxLength={20}
              pattern="^[a-zA-Z0-9_]+$"
              title="Username can only contain letters, numbers, and underscores"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              3-20 characters, letters, numbers, and underscores only
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 py-3 text-base hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:py-4 sm:text-lg"
            disabled={isSubmitting || !username.trim()}
          >
            {isSubmitting ? 'Setting up...' : 'Start Chatting'}
          </Button>
        </form>
      </div>
    </div>
  )
}
