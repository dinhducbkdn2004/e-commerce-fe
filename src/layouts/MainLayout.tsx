import { ThemeToggle } from '@/components/ThemeToggle'
import { ROUTES } from '@/constants'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { NavMenu } from './NavMenu'
import { ShoppingBag } from 'lucide-react'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='fixed top-0 left-0 right-0 z-50 transition-all duration-300'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-[4.5rem]'>
            {/* Logo and Navigation */}
            <div className='flex items-center space-x-8'>
              {/* Logo */}
              <Link
                to={ROUTES.HOME}
                className='flex items-center text-xl font-bold transition-colors'
              >
                <img
                  src='/images/logo/BeeLuxe-logo-transparent.png'
                  alt='E-Commerce Logo'
                  className='h-20 w-20 object-contain'
                />
                {/* <span className='font-bold text-3xl italic leading-none'>
                  BeeLuxe
                </span> */}
              </Link>

              {/* Navigation */}
              <NavMenu />
            </div>

            {/* Right side */}
            <div className='flex items-center space-x-4'>
              <Link
                to={ROUTES.LOGIN}
                className=' px-4 py-2 rounded-lg  transition-colors'
              >
                Sign in
              </Link>
              {'|'}
              <Link
                to={ROUTES.LOGIN}
                className=' px-4 py-2 rounded-lg  transition-colors'
              >
                  Create account
              </Link>
              <ThemeToggle />
              <Link
                to={ROUTES.CART}
                className='relative flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <ShoppingBag className='h-6 w-6 text-gray-700' />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 pt-[4.5rem]'>{children}</main>
    </div>
  )
}
