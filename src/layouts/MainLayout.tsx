import ScrollToTop from '@/components/ScrollToTop'
import { ProgressBar } from '@/components/animations/SmoothComponents'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()

  // Pages that need full viewport (no header padding)
  const fullViewportPages = ['/login', '/register']

  // Pages that need minimal padding (like home)
  const minimalPaddingPages = ['/']

  const isFullViewport = fullViewportPages.includes(location.pathname)
  const isMinimalPadding = minimalPaddingPages.includes(location.pathname)

  const getMainPadding = () => {
    if (isFullViewport) return ''
    if (isMinimalPadding) return 'pt-14 sm:pt-16 lg:pt-[4.5rem]'
    return 'pt-16 sm:pt-20 lg:pt-24' // Standard pages with more breathing room
  }

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
