import { useAuthContext } from '@/hooks/useAuthContext'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading } = useAuthContext()
  const location = useLocation()

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600'></div>
      </div>
    )
  }

  // If route requires authentication but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Save attempted location for redirect after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // If route is for non-authenticated users but user is authenticated
  if (!requireAuth && isAuthenticated) {
    // Redirect authenticated users away from auth pages
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
