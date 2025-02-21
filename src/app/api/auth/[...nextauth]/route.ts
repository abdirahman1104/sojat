import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { createUser, getUser } from '@/lib/users'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false
      }

      // Check if user exists
      const dbUser = await getUser(user.id)
      
      if (!dbUser) {
        // Create new user if they don't exist
        await createUser({
          id: user.id,
          email: user.email,
          name: user.name || '',
        })
      }

      return true
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async redirect({ baseUrl }) {
      // After sign in, always go to onboarding first
      // The onboarding page will check if user exists and redirect accordingly
      return `${baseUrl}/onboarding`
    },
  },
}

const handler = NextAuth(authOptions)

// Export the handler as both GET and POST
export { handler as GET, handler as POST }
