export interface ApiError extends Error {
  message: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  preferred_language?: string;
  created_at?: string;
  updated_at?: string;
}
