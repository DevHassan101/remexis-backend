// middleware.js (place this in your src/ directory, same level as app/)
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Define protected admin routes based on your structure
    const adminRoutes = [
      '/dashboard',
      '/admin-management',
      '/article-management', 
      '/user-management'
    ]

    // Define public routes (no authentication required)
    const publicRoutes = [
      '/login',
      '/signup',
      '/', // website home
      '/about',
      '/articles', // public articles page
      '/contact',
      '/faqs'
    ]

    // Define user routes (for regular users)
    const userRoutes = [
      '/ai-chat'
    ]

    // Check route types
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
    const isUserRoute = userRoutes.some(route => pathname.startsWith(route))
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))
    const isWebsiteRoute = pathname.startsWith('/website') || 
                          pathname === '/about' || 
                          pathname === '/articles' || 
                          pathname === '/contact' || 
                          pathname === '/faqs'

    // If user is not logged in
    if (!token) {
      // Allow access to public routes and website routes
      if (isPublicRoute || isWebsiteRoute) {
        return NextResponse.next()
      }
      // Redirect to login for protected routes
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // User is logged in, check role-based access
    const userRole = token.role

    console.log(`User role: ${userRole}, Path: ${pathname}`) // Debug log

    // If trying to access admin routes
    if (isAdminRoute) {
      if (userRole !== 'ADMIN') {
        // If user is logged in but not admin, redirect to ai-chat
        console.log(`Non-admin user trying to access admin route, redirecting to /ai-chat`)
        return NextResponse.redirect(new URL('/ai-chat', req.url))
      }
      // Admin can access admin routes
      return NextResponse.next()
    }

    // If trying to access user routes
    if (isUserRoute) {
      // Both users and admins can access user routes
      return NextResponse.next()
    }

    // If trying to access auth pages while already logged in
    if (pathname === '/login' || pathname === '/signup') {
      // Redirect based on role
      if (userRole === 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/ai-chat', req.url))
      }
    }

    // Allow access to website/public routes for logged-in users
    if (isWebsiteRoute || isPublicRoute) {
      return NextResponse.next()
    }

    // Default: allow access
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Always run middleware for protected routes
        const protectedRoutes = [
          '/dashboard',
          '/admin-management',
          '/article-management',
          '/user-management',
          '/ai-chat'
        ]
        
        const isProtectedRoute = protectedRoutes.some(route => 
          pathname.startsWith(route)
        )
        
        // Also run for auth routes to handle redirects
        const isAuthRoute = pathname === '/login' || pathname === '/signup'
        
        // Run middleware if it's a protected route, auth route, or user is logged in
        return isProtectedRoute || isAuthRoute || !!token
      },
    },
  }
)

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
}