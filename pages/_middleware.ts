import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

interface Data {
  name: string
}

export async function middleware(
  req: NextApiRequest
  //res: NextApiResponse<Data>
) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET || '' })

  const pathname = req.url || ''
  console.log('pathname', pathname)

  // Allow the requet if the following is true...
  // 1) Its a request for next-auth session & provider fetching
  // 2) The token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirect user to login if they dont have token AND are requesting a protected route
  if (!token && pathname !== `${process.env.NEXTAUTH_URL}/login`) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
  }
}
