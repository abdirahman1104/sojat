export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string // UUID stored as string
          email: string
          name: string | null
          username: string
          preferred_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string // UUID stored as string
          email: string
          name?: string | null
          username: string
          preferred_language: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string // UUID stored as string
          email?: string
          name?: string | null
          username?: string
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
