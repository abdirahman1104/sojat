import type { NextRequest } from 'next/server'

export type GET = (request: NextRequest) => Promise<Response>
export type POST = (request: NextRequest) => Promise<Response>
