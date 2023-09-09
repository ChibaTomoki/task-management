import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge'

export default withMiddlewareAuthRequired()

export const config = {
  matcher: [
    '/sample/profile-client',
    '/sample/profile-server',
    '/board',
    '/table',
  ],
}
