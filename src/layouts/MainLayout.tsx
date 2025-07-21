import { ThemeToggle } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants'
import { ShoppingBag } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { NavMenu } from './NavMenu'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border bg-background shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-[4.5rem]'>
            {/* Logo and Navigation */}
            <div className='flex items-center space-x-8'>
              {/* Logo */}
              <Link
                to={ROUTES.HOME}
                className='flex items-center font-bold transition-colors'
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
                className='inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors'
              >
                Sign in
              </Link>
              <span className='text-muted-foreground'>|</span>
              <Link
                to={ROUTES.LOGIN}
                className='inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors'
              >
                Create account
              </Link>
              <ThemeToggle />
              <Link
                to={ROUTES.CART}
                className='relative flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors'
              >
                <ShoppingBag className='h-6 w-6 text-foreground' />
                <Badge className='absolute -top-0 -right-0 h-4 min-w-4 rounded-full px-1 text-xs font-bold'>
                  2
                </Badge>
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
