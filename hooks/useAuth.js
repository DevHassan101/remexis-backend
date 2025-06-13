// hooks/useAuth.js (create this file in src/hooks/)
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useAuth = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  return {
    user: session?.user,
    role: session?.user?.role,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === 'ADMIN',
    isUser: session?.user?.role === 'USER',
    isLoading: status === 'loading',
    session,
    status
  }
}

// Higher-order component for protecting admin routes
export const withAdminAuth = (WrappedComponent) => {
  return function AdminProtectedComponent(props) {
    const { isAdmin, isLoading, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/login')
        } else if (!isAdmin) {
          router.push('/ai-chat')
        }
      }
    }, [isAdmin, isLoading, isAuthenticated, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (!isAuthenticated || !isAdmin) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

// Higher-order component for protecting user routes
export const withUserAuth = (WrappedComponent) => {
  return function UserProtectedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login')
      }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}