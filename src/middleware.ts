import { NextRequest, NextResponse } from 'next/server';  // Import NextRequest and NextResponse for handling requests
import { getToken } from 'next-auth/jwt';  // Import getToken to handle JWT token management
import authConfig from '@/auth.config';  // Import your NextAuth configuration

const protectedRoutes = [
  '/settings',  // Example protected route
  // Add more protected routes as needed
];

export default async function middleware(req: NextRequest): Promise<Response | undefined> {
  const { pathname } = req.nextUrl;  // Get the pathname from the request URL

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If the route is not protected, continue without checking authentication
  if (!isProtectedRoute) {
    return NextResponse.next();  // Allow the request to continue
  }

  // Use the correct secret from environment variables
  const secret = process.env.AUTH_SECRET || '';  // Fallback to an empty string if not set

  // Check for a valid session token using NextAuth's getToken method
  const token = await getToken({ req, secret, salt: 'default_salt' });

  // If the user is not authenticated, redirect them to the login page
  if (!token) {
    const loginUrl = new URL('/login', req.nextUrl.origin);  // Adjust login URL as necessary
    return NextResponse.redirect(loginUrl.toString());
  }

  // If the user is authenticated, allow the request to continue
  return NextResponse.next();  // Allow the request to continue
}

// Middleware configuration to match specific routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
