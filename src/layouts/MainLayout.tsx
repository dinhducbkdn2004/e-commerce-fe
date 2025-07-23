import ScrollToTop from '@/components/ScrollToTop'
import { ProgressBar } from '@/components/animations/SmoothComponents'
import type { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='min-h-screen'>
      <ProgressBar />
      <Header />
      <main className='flex-1 pt-[4.5rem]'>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
