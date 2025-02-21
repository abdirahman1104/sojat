import { supabaseAdmin } from './supabase'
import { User } from '@/types'

export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching user:', error)
    return null
  }

  return data
}

export async function createUser(user: {
  id: string
  email: string
  name: string
}): Promise<User | null> {
  const { data, error } = await supabaseAdmin.from('users').insert([
    {
      id: user.id,
      email: user.email,
      name: user.name,
      username: null, // Will be set during onboarding
      preferred_language: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]).select().single()

  if (error) {
    console.error('Error creating user:', error)
    return null
  }

  return data
}

export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating user:', error)
    return null
  }

  return data
}
