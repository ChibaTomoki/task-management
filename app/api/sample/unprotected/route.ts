import { NextResponse } from 'next/server'

export const GET = () => NextResponse.json({ message: 'GET /api/sample/unprotected is called' })
