'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    preferredLanguage: 'en'
  })

  // Check if user already exists in Supabase
  useEffect(() => {
    async function checkUser() {
      if (session?.user?.email) {
        const { data: user } = await supabase
          .from('users')
          .select('id')
          .eq('email', session.user.email)
          .single()

        if (user) {
          router.push('/chat')
        }
      }
    }
    checkUser()
  }, [session, router])

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (status === 'unauthenticated') {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          ...formData,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      router.push('/chat')
    } catch (error) {
      console.error('Signup error:', error)
      setIsLoading(false)
      // You might want to show an error message to the user here
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Complete Your Profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please provide additional information to complete your account setup
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">
                Preferred Language
              </label>
              <select
                id="language"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.preferredLanguage}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredLanguage: e.target.value }))}
              >
                <option value="en">English</option>
                <option value="so">Somali</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Completing Setup...' : 'Complete Setup'}
          </Button>
        </form>
      </div>
    </div>
  )
}
