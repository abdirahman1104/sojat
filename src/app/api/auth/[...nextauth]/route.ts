import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabaseAdmin } from '@/lib/supabase'

export const authOptions = {
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
  callbacks: {
    async jwt({ token, account }) {
      // Store the Google ID in the token when first signing in
      if (account?.provider === 'google') {
        token.id = account.providerAccountId
      }
      return token
    },
    async session({ session, token }) {
      // Pass the ID to the session
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // After sign in, always go to onboarding first
      // The onboarding page will check if user exists and redirect accordingly
      return `${baseUrl}/onboarding`
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
