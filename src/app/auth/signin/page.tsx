import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { SignInButtons } from '@/components/auth/sign-in-buttons'

export default async function SignInPage() {
  const session = await getSession()
  if (session?.user) {
    redirect('/chat')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Sojat
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <SignInButtons />
      </div>
    </div>
  )
}
