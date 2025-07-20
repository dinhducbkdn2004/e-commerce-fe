import ThemeToggle from '@/components/ThemeToggle'
import { ROUTES } from '@/constants'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <header className='bg-white dark:bg-gray-800 shadow-sm'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <Link
              to={ROUTES.HOME}
              className='text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
            >
              E-Commerce
            </Link>

            {/* Navigation */}
            <nav className='hidden md:flex items-center space-x-8'>
              <Link
                to={ROUTES.HOME}
                className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
              >
                Home
              </Link>
              <Link
                to={ROUTES.PRODUCTS}
                className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
              >
                Products
              </Link>
              <Link
                to={ROUTES.CART}
                className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
              >
                Cart
              </Link>
            </nav>

            {/* Right side */}
            <div className='flex items-center space-x-4'>
              <ThemeToggle />
              <Link
                to={ROUTES.LOGIN}
                className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1'>{children}</main>

      {/* Footer */}
      <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                E-Commerce
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Your one-stop shop for everything you need.
              </p>
            </div>

            <div>
              <h4 className='text-md font-medium text-gray-900 dark:text-white mb-4'>
                Quick Links
              </h4>
              <ul className='space-y-2'>
                <li>
                  <Link
                    to={ROUTES.HOME}
                    className='text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.PRODUCTS}
                    className='text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  >
                    Products
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='text-md font-medium text-gray-900 dark:text-white mb-4'>
                Customer Service
              </h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='text-md font-medium text-gray-900 dark:text-white mb-4'>
                Follow Us
              </h4>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                >
                  Facebook
                </a>
                <a
                  href='#'
                  className='text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center'>
            <p className='text-gray-600 dark:text-gray-400'>
              © 2025 E-Commerce. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
