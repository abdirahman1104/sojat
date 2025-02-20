import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthError({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-red-500">
            Authentication Error
          </h1>
          <p className="text-sm text-muted-foreground">
            {searchParams.error === 'AccessDenied'
              ? 'You do not have access to this application.'
              : 'There was an error signing you in.'}
          </p>
        </div>
        <Button asChild>
          <Link href="/auth/signin">Try Again</Link>
        </Button>
      </div>
    </div>
  )
}
