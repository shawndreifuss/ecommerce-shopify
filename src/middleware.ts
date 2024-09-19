import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/my-account', '/settings', '/orders'];
const authRestrictedRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest): Promise<Response | undefined> {
  const { pathname } = req.nextUrl;


  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Ensure that the secret is defined or throw an error if missing
  const secret = process.env.AUTH_SECRET || 'default-secret';

  if (!secret) {
    throw new Error('AUTH_SECRET is not set in environment variables');
  }

 const cookies = process.env.NODE_ENV === 'production'
 const salt = process.env.AUTH_SALT || 'default'

  // Use getToken with the NextRequest and secret
  const token = await getToken({
    req,
    secret,
    secureCookie: cookies,
    salt,
  });

  // If the user is not authenticated, redirect them to the login page
  if (!token) {
    const loginUrl = new URL('/login', req.nextUrl);
    return NextResponse.redirect(loginUrl.toString());
  }

  // Check if the route is a login or register page
  const isAuthRestrictedRoute = authRestrictedRoutes.some(route => pathname === route);

  // If the user is authenticated and tries to access login or register, redirect them
  if (token && isAuthRestrictedRoute) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Middleware configuration to match specific routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Match all routes except for excluded ones
};
