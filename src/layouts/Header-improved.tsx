import { ThemeToggle } from '@/components/ThemeToggle'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown,
  Flame,
  Heart,
  Menu,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  cartItemsCount?: number
  wishlistCount?: number
}

function Header({ cartItemsCount = 0, wishlistCount = 0 }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navigationItems = [
    {
      title: 'Women',
      icon: '👗',
      href: '/women',
      submenu: [
        { title: 'Áo', href: '/women/tops' },
        { title: 'Quần', href: '/women/pants' },
        { title: 'Váy', href: '/women/dresses' },
        { title: 'Bộ sưu tập', href: '/women/collections' },
        { title: 'Phụ kiện', href: '/women/accessories' },
      ],
    },
    {
      title: 'Men',
      icon: '👔',
      href: '/men',
      submenu: [
        { title: 'Áo sơ mi', href: '/men/shirts' },
        { title: 'Quần tây', href: '/men/pants' },
        { title: 'Áo thun', href: '/men/t-shirts' },
        { title: 'Bộ sưu tập', href: '/men/collections' },
        { title: 'Phụ kiện', href: '/men/accessories' },
      ],
    },
    {
      title: 'New Arrivals',
      icon: <Sparkles className='h-4 w-4' />,
      href: '/new-arrivals',
      highlight: true,
    },
    {
      title: 'Sale',
      icon: <Flame className='h-4 w-4 text-red-500' />,
      href: '/sale',
      highlight: true,
      badge: 'Hot',
    },
    {
      title: 'Collections',
      icon: <Palette className='h-4 w-4' />,
      href: '/collections',
      submenu: [
        { title: 'Spring 2025', href: '/collections/spring-2025' },
        { title: 'Summer Vibes', href: '/collections/summer-vibes' },
        { title: 'Elegant Evening', href: '/collections/elegant-evening' },
        { title: 'Casual Comfort', href: '/collections/casual-comfort' },
      ],
    },
  ]

  return (
    <>
      {/* Main Header */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm'>
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='flex items-center justify-between h-16 lg:h-20'>
            {/* Logo Section */}
            <div className='flex items-center'>
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

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-8'>
              {navigationItems.map(item => (
                <div
                  key={item.title}
                  className='relative group'
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      item.highlight
                        ? 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {typeof item.icon === 'string' ? (
                      <span className='text-base'>{item.icon}</span>
                    ) : (
                      item.icon
                    )}
                    <span>{item.title}</span>
                    {item.submenu && (
                      <ChevronDown className='h-4 w-4 transition-transform duration-200 group-hover:rotate-180' />
                    )}
                    {item.badge && (
                      <Badge className='ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5'>
                        {item.badge}
                      </Badge>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.submenu && activeDropdown === item.title && (
                    <div className='absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50'>
                      {item.submenu.map(subItem => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors'
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className='flex items-center space-x-4'>
              {/* Search */}
              <div className='relative'>
                {isSearchOpen ? (
                  <div className='flex items-center'>
                    <input
                      type='text'
                      placeholder='Tìm sản phẩm, danh mục...'
                      className='w-64 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      autoFocus
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className='ml-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    >
                      <X className='h-5 w-5' />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
                  >
                    <Search className='h-5 w-5' />
                  </button>
                )}
              </div>

              {/* User Account */}
              <Link
                to='/account'
                className='hidden lg:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
              >
                <User className='h-5 w-5' />
                <span>Account</span>
              </Link>

              {/* Wishlist */}
              <Link
                to='/wishlist'
                className='relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
              >
                <Heart className='h-5 w-5' />
                {wishlistCount > 0 && (
                  <Badge className='absolute -top-1 -right-1 h-5 min-w-5 bg-red-500 text-white text-xs'>
                    {wishlistCount}
                  </Badge>
                )}
              </Link>

              {/* Shopping Cart */}
              <Link
                to='/cart'
                className='relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
              >
                <ShoppingBag className='h-5 w-5' />
                {cartItemsCount > 0 && (
                  <Badge className='absolute -top-1 -right-1 h-5 min-w-5 bg-indigo-500 text-white text-xs'>
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
              >
                {isMobileMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
            <div className='container mx-auto px-4 py-4'>
              <nav className='space-y-4'>
                {navigationItems.map(item => (
                  <div key={item.title}>
                    <Link
                      to={item.href}
                      className='flex items-center space-x-2 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {typeof item.icon === 'string' ? (
                        <span>{item.icon}</span>
                      ) : (
                        item.icon
                      )}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className='bg-red-500 text-white text-xs'>
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                    {item.submenu && (
                      <div className='ml-6 mt-2 space-y-2'>
                        {item.submenu.map(subItem => (
                          <Link
                            key={subItem.title}
                            to={subItem.href}
                            className='block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Account Link */}
                <Link
                  to='/account'
                  className='flex items-center space-x-2 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-t border-gray-200 dark:border-gray-700 pt-4'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className='h-5 w-5' />
                  <span>My Account</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className='h-16 lg:h-20'></div>
    </>
  )
}

export default Header
