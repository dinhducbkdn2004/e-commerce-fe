import { ThemeToggle } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useScroll } from '@/hooks/useScroll'
import {
  ChevronDown,
  Heart,
  LogOut,
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollDirection, isScrolled } = useScroll({ threshold: 50 })
  const { isAuthenticated, user } = useAuthContext()
  const { logout } = useAuth()

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
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

  // Close search when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsSearchOpen(false)
    }
  }, [isMobileMenuOpen])

  const navigationItems = [
    {
      name: 'Shop',
      href: '/shop',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Bags & Purses', href: '/shop/bags' },
        { name: 'Clothing', href: '/shop/clothing' },
        { name: 'Accessories', href: '/shop/accessories' },
        { name: 'Jewelry', href: '/shop/jewelry' },
      ],
    },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Sale', href: '/sale', badge: 'Up to 50%' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <>
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
        <div className='container mx-auto px-3 sm:px-4'>
          <div className='flex items-center justify-between h-14 sm:h-16 lg:h-[4.5rem]'>
            {/* Logo */}
            <div className='flex items-center flex-shrink-0'>
              <Link to='/' className='flex items-center space-x-2 group'>
                <div className='relative'>
                  <div className='w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-indigo-600 transform rotate-45 rounded-sm group-hover:scale-110 transition-transform duration-300'></div>
                  <div className='absolute inset-1 bg-white dark:bg-gray-900 transform rotate-45 rounded-sm'></div>
                </div>
                <span className='text-lg sm:text-xl lg:text-2xl font-light tracking-wider text-gray-900 dark:text-white'>
                  Bee
                  <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
                    Luxe
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-6 xl:space-x-8'>
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

                  {/* Desktop Dropdown Menu */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className='absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-700 rounded-lg shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                      <div className='p-4'>
                        <div className='grid grid-cols-1 gap-2'>
                          {item.dropdownItems.map(dropdownItem => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className='block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-md transition-colors'
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
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
            <div className='flex items-center space-x-1 sm:space-x-2'>
              {/* Search Icon - Hidden on mobile if menu is open */}
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 p-2 ${isMobileMenuOpen ? 'hidden sm:flex' : 'flex'}`}
              >
                <Search className='h-4 w-4 sm:h-5 sm:w-5' />
              </Button>

              {/* Wishlist - Hidden on small screens */}
              <Link to='/wishlist' className='hidden sm:flex'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 p-2'
                >
                  <Heart className='h-4 w-4 sm:h-5 sm:w-5' />
                </Button>
              </Link>

              {/* Cart */}
              <Link to={ROUTES.CART} className='relative'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 p-2'
                >
                  <ShoppingBag className='h-4 w-4 sm:h-5 sm:w-5' />
                  <Badge className='absolute -top-1 -right-1 h-4 min-w-4 sm:h-5 sm:min-w-5 rounded-full px-1 text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0'>
                    2
                  </Badge>
                </Button>
              </Link>

              {/* Auth Buttons - Desktop */}
              <div className='hidden lg:flex items-center space-x-2'>
                {isAuthenticated ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={logout}
                    className='hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
                  >
                    <User className='h-4 w-4 mr-2' />
                    {user?.name}
                    <LogOut className='ml-2 h-4 w-4' />
                  </Button>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              {/* Theme Toggle */}
              <div
                className={`${isMobileMenuOpen ? 'hidden sm:flex' : 'flex'}`}
              >
                <ThemeToggle />
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant='ghost'
                size='sm'
                className='lg:hidden hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 p-2'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className='h-5 w-5 sm:h-6 sm:w-6' />
                ) : (
                  <Menu className='h-5 w-5 sm:h-6 sm:w-6' />
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          {isSearchOpen && !isMobileMenuOpen && (
            <div className='border-t border-purple-200 dark:border-purple-700 py-3 sm:py-4 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10'>
              <div className='relative max-w-md mx-auto'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400' />
                <input
                  type='text'
                  placeholder='Search products...'
                  className='w-full pl-10 pr-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm'
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 top-14 sm:top-16 z-40 lg:hidden'>
          <div
            className='absolute inset-0 bg-black/20 backdrop-blur-sm'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className='relative bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 h-full overflow-y-auto'>
            <div className='px-4 py-4 sm:py-6 space-y-4 sm:space-y-6'>
              {/* Mobile Search */}
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400' />
                <input
                  type='text'
                  placeholder='Search products...'
                  className='w-full pl-10 pr-4 py-2.5 sm:py-3 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm'
                />
              </div>

              {/* Mobile Navigation */}
              <nav className='space-y-1'>
                {navigationItems.map(item => (
                  <div key={item.name}>
                    <div className='flex items-center justify-between'>
                      <Link
                        to={item.href}
                        className='flex items-center space-x-2 px-3 py-2.5 sm:py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-colors flex-1'
                        onClick={() =>
                          !item.hasDropdown && setIsMobileMenuOpen(false)
                        }
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge
                            variant='destructive'
                            className='text-xs bg-gradient-to-r from-purple-600 to-indigo-600 border-0'
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                      {item.hasDropdown && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => toggleDropdown(item.name)}
                          className='p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </Button>
                      )}
                    </div>

                    {/* Mobile Dropdown Content */}
                    {item.hasDropdown &&
                      item.dropdownItems &&
                      activeDropdown === item.name && (
                        <div className='ml-4 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200'>
                          {item.dropdownItems.map(dropdownItem => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className='block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors'
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                          <Link
                            to='/shop/all'
                            className='block px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-md transition-colors mt-2'
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            View All Products
                          </Link>
                        </div>
                      )}
                  </div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className='border-t border-purple-200 dark:border-purple-700 pt-4 sm:pt-6 space-y-3 sm:space-y-4'>
                {/* Wishlist link for mobile */}
                <Link
                  to='/wishlist'
                  className='flex items-center px-3 py-2.5 sm:py-3 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-colors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className='h-5 w-5 mr-3' />
                  Wishlist
                </Link>

                {/* Auth buttons for mobile and tablet */}
                <div className='space-y-2'>
                  {isAuthenticated ? (
                    <Button
                      variant='outline'
                      className='w-full justify-start border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 py-2.5 sm:py-3'
                      onClick={logout}
                    >
                      <User className='h-4 w-4 mr-2' />
                      Sign out
                    </Button>
                  ) : (
                    <>
                      <Link
                        to={ROUTES.LOGIN}
                        className='block'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant='outline'
                          className='w-full justify-start border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 py-2.5 sm:py-3'
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
                        <Button className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 py-2.5 sm:py-3'>
                          Create Account
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
