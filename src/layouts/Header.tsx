import { ThemeToggle } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { useScroll } from '@/hooks/useScroll'
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { scrollDirection, isScrolled } = useScroll({ threshold: 50 })

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navigationItems = [
    { name: 'Shop', href: '/shop', hasDropdown: true },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Sale', href: '/sale', badge: 'Up to 50%' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-purple-200/30 dark:border-purple-700/30 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20'
          : 'bg-gradient-to-r from-purple-50/80 via-indigo-50/80 to-blue-50/80 dark:from-gray-900/80 dark:via-purple-900/20 dark:to-indigo-900/20 backdrop-blur-md'
      } ${
        scrollDirection === 'down' && isScrolled
          ? '-translate-y-full'
          : 'translate-y-0'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16 lg:h-[4.5rem]'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center space-x-2 group'>
              <div className='relative'>
                <div className='w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 transform rotate-45 rounded-sm group-hover:scale-110 transition-transform duration-300'></div>
                <div className='absolute inset-1 bg-white dark:bg-gray-900 transform rotate-45 rounded-sm'></div>
              </div>
              <span className='text-xl lg:text-2xl font-light tracking-wider text-gray-900 dark:text-white'>
                Bee
                <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
                  Luxe
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navigationItems.map(item => (
              <div key={item.name} className='relative group'>
                <Link
                  to={item.href}
                  className='flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2'
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant='destructive'
                      className='ml-2 text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0'
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {item.hasDropdown && (
                    <ChevronDown className='w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200' />
                  )}
                </Link>

                {/* Dropdown Menu for Shop */}
                {item.hasDropdown && (
                  <div className='absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-700 rounded-lg shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                    <div className='p-4'>
                      <div className='grid grid-cols-1 gap-3'>
                        <Link
                          to='/shop/bags'
                          className='block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors'
                        >
                          Bags & Purses
                        </Link>
                        <Link
                          to='/shop/clothing'
                          className='block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors'
                        >
                          Clothing
                        </Link>
                        <Link
                          to='/shop/accessories'
                          className='block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors'
                        >
                          Accessories
                        </Link>
                        <Link
                          to='/shop/jewelry'
                          className='block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors'
                        >
                          Jewelry
                        </Link>
                        <hr className='my-2 border-purple-200 dark:border-purple-700' />
                        <Link
                          to='/shop/all'
                          className='block px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-md transition-colors'
                        >
                          View All Products
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-2 lg:space-x-4'>
            {/* Search Icon */}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className='hidden sm:flex hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
            >
              <Search className='h-5 w-5' />
            </Button>

            {/* Wishlist */}
            <Link to='/wishlist' className='hidden sm:flex'>
              <Button
                variant='ghost'
                size='sm'
                className='hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
              >
                <Heart className='h-5 w-5' />
              </Button>
            </Link>

            {/* Cart */}
            <Link to={ROUTES.CART} className='relative'>
              <Button
                variant='ghost'
                size='sm'
                className='hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
              >
                <ShoppingBag className='h-5 w-5' />
                <Badge className='absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0'>
                  2
                </Badge>
              </Button>
            </Link>

            {/* Auth Buttons - Desktop */}
            <div className='hidden lg:flex items-center space-x-2'>
              <Link to={ROUTES.LOGIN}>
                <Button
                  variant='ghost'
                  size='sm'
                  className='hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
                >
                  <User className='h-4 w-4 mr-2' />
                  Sign in
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button
                  size='sm'
                  className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0'
                >
                  Join
                </Button>
              </Link>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <Button
              variant='ghost'
              size='sm'
              className='md:hidden hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className='border-t border-purple-200 dark:border-purple-700 py-4 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10'>
            <div className='relative max-w-md mx-auto'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400' />
              <input
                type='text'
                placeholder='Search products...'
                className='w-full pl-10 pr-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 top-16 z-40 md:hidden'>
          <div
            className='absolute inset-0 bg-black/20 backdrop-blur-sm'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className='relative bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 h-full overflow-y-auto'>
            <div className='px-4 py-6 space-y-6'>
              {/* Mobile Search */}
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400' />
                <input
                  type='text'
                  placeholder='Search products...'
                  className='w-full pl-10 pr-4 py-3 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                />
              </div>

              {/* Mobile Navigation */}
              <nav className='space-y-1'>
                {navigationItems.map(item => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className='flex items-center justify-between px-3 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-colors'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className='flex items-center space-x-2'>
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge
                            variant='destructive'
                            className='text-xs bg-gradient-to-r from-purple-600 to-indigo-600 border-0'
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      {item.hasDropdown && <ChevronDown className='w-4 h-4' />}
                    </Link>

                    {/* Mobile Dropdown Content */}
                    {item.hasDropdown && (
                      <div className='ml-4 mt-2 space-y-1'>
                        <Link
                          to='/shop/bags'
                          className='block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Bags & Purses
                        </Link>
                        <Link
                          to='/shop/clothing'
                          className='block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Clothing
                        </Link>
                        <Link
                          to='/shop/accessories'
                          className='block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Accessories
                        </Link>
                        <Link
                          to='/shop/jewelry'
                          className='block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Jewelry
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className='border-t border-purple-200 dark:border-purple-700 pt-6 space-y-4'>
                <Link
                  to='/wishlist'
                  className='flex items-center px-3 py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-colors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className='h-5 w-5 mr-3' />
                  Wishlist
                </Link>

                <div className='space-y-2'>
                  <Link
                    to={ROUTES.LOGIN}
                    className='block'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant='outline'
                      className='w-full justify-start border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
                    >
                      <User className='h-4 w-4 mr-2' />
                      Sign in
                    </Button>
                  </Link>
                  <Link
                    to={ROUTES.REGISTER}
                    className='block'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0'>
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
