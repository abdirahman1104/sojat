import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = path === '/'

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If the user is not authenticated and tries to access a protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If authenticated, check if user exists in Supabase
  if (token?.email && !isPublicPath && path !== '/onboarding') {
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', token.email)
      .single()

    // If user doesn't exist, redirect to onboarding
    if (!user && path !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }

  // If user is authenticated and on home page, redirect to chat
  if (token && isPublicPath) {
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', token.email)
      .single()

    if (user) {
      return NextResponse.redirect(new URL('/chat', request.url))
    } else {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
