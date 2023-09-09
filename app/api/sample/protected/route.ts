import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export const GET = withApiAuthRequired(async (req) => {
  const res = new NextResponse()
  const session = await getSession(req, res)
  if (!session) throw new Error()
  if (typeof session.user.sub !== 'string') throw new Error()
  return NextResponse.json(
    { protected: 'My Secret', id: session.user.sub },
    res,
  )
})
