import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'No session or email found' }, { status: 401 })
    }

    const body = await req.json()
    const { username, email } = body

    if (!username || !email) {
      return NextResponse.json({ error: 'Missing username or email' }, { status: 400 })
    }

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('users')
      .select('username')
      .eq('username', username)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking username:', checkError)
      return NextResponse.json({ error: 'Error checking username' }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 })
    }

    // Insert new user using Google ID
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        id: session.user.id,
        email: session.user.email,
        username,
        name: session.user.name || '',
        preferred_language: 'en',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating user:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Profile completed successfully',
      user: newUser
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
