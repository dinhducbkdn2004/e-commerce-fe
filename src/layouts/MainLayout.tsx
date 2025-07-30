import ScrollToTop from '@/components/ScrollToTop'
import { ProgressBar } from '@/components/animations/SmoothComponents'
import { useAuthContext } from '@/hooks/useAuthContext'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuthContext()

  // Pages that need full viewport (no header padding)
  const fullViewportPages = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/auth/verify-email',
    '/auth/resend-verification',
    '/auth/reset-password',
  ]

  // Pages that need minimal padding (like home)
  const minimalPaddingPages = ['/']

  const isFullViewport = fullViewportPages.includes(location.pathname)
  const isMinimalPadding = minimalPaddingPages.includes(location.pathname)

  // Show loading spinner during auth check
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white dark:bg-gray-900'>
        <div className='flex flex-col items-center gap-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600'></div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>Loading...</p>
        </div>
      </div>
    )
  }

  const getMainPadding = () => {
    if (isFullViewport) return ''
    if (isMinimalPadding) return 'pt-14 sm:pt-16 lg:pt-[4.5rem]'
    return 'pt-16 sm:pt-20 lg:pt-24' // Standard pages with more breathing room
  }

  // Debug log for development
  console.log('Auth status:', { isAuthenticated, pathname: location.pathname })

  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900'>
      <ProgressBar />
      {!isFullViewport && <Header />}
      <main className={`flex-1 ${getMainPadding()}`}>{children}</main>
      {!isFullViewport && <Footer />}
      <ScrollToTop />
    </div>
  )
}
