import { ThemeToggle } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants'
import { useScroll } from '@/hooks/useScroll'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NavMenu } from './NavMenu'

function Header() {
  const { scrollDirection, isScrolled } = useScroll({ threshold: 50 })

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/20 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg shadow-sm'
          : 'bg-background/80 backdrop-blur-md'
      } ${
        scrollDirection === 'down' && isScrolled
          ? '-translate-y-full'
          : 'translate-y-0'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-[4.5rem]'>
          <div className='flex items-center space-x-8'>
            {/* <Link
              to={ROUTES.HOME}
              className='flex items-center font-bold transition-colors'
            >
              <img
                src='/images/logo/BeeLuxe-logo.svg'
                alt='E-Commerce Logo'
                className='h-20 w-20 object-contain'
              />
            </Link> */}

            <div className='flex items-center font-bold transition-colors'>
              <Link to='/' className='flex items-center space-x-2 group'>
                {/* Diamond Icon as Logo Alternative */}
                <div className='relative'>
                  <div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 transform rotate-45 rounded-sm group-hover:scale-110 transition-transform duration-300'></div>
                  <div className='absolute inset-1 bg-white dark:bg-gray-900 transform rotate-45 rounded-sm'></div>
                </div>
                <span className='text-2xl font-light tracking-wider text-gray-900 dark:text-white'>
                  Bee<span className='font-semibold'>Luxe</span>
                </span>
              </Link>
            </div>
            <NavMenu />
          </div>

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
  )
}

export default Header
