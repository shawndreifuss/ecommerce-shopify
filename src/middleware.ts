import { NextRequest, NextResponse } from 'next/server';  // Import NextRequest and NextResponse for handling requests
import { getToken } from 'next-auth/jwt';  // Import getToken to handle JWT token management


const protectedRoutes = [
 'my-account',
 'settings',  
];

const authRestrictedRoutes = [
  '/login',
  '/register'
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
    const loginUrl = new URL('/login', req.nextUrl);  // Adjust login URL as necessary
    return NextResponse.redirect(loginUrl.toString());
  }

    // Check if the route is a login or register page
    const isAuthRestrictedRoute = authRestrictedRoutes.some(route => pathname === route);

  // Debugging output
  console.log(`Pathname: ${pathname}, Is Authenticated: ${!!token}, Is Protected Route: ${isProtectedRoute}, Is Auth Restricted Route: ${isAuthRestrictedRoute}`);

  // If the user is authenticated and tries to access login or register, redirect them
  if (token && isAuthRestrictedRoute) {
    return NextResponse.redirect(new URL('/', req.nextUrl));  // Redirect authenticated users to home page
  }
   // If the user is authenticated and tries to access login or register, redirect them
   if (token && token.user && isAuthRestrictedRoute) {
    return NextResponse.redirect(new URL('/', req.nextUrl));  // Redirect authenticated users to home page
  }


  // If the user is authenticated, allow the request to continue
  return NextResponse.next();  // Allow the request to continue
}

// Middleware configuration to match specific routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
