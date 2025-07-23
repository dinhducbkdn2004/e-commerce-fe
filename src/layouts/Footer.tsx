import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      aria-labelledby='footer-heading'
      className='border-t mt-16 lg:mt-20 border-gray-900/10 dark:border-gray-700'
    >
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8 lg:pt-24'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12'>
          <div>
            <div className='flex items-center font-bold transition-colors'>
              <Link to='/' className='flex items-center space-x-2 group'>
                {/* Diamond Icon as Logo Alternative */}
                <div className='relative'>
                  <div className='w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 transform rotate-45 rounded-sm group-hover:scale-110 transition-transform duration-300'></div>
                  <div className='absolute inset-1 bg-white dark:bg-gray-900 transform rotate-45 rounded-sm'></div>
                </div>
              </Link>
            </div>
            <p className='mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400'>
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className='mt-6 flex space-x-6'>
              <Link to='#' className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Facebook</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
              <Link to='#' className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Instagram</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.418-3.323C6.001 8.2 7.152 7.71 8.449 7.71c1.297 0 2.448.49 3.323 1.414c.875.875 1.414 2.026 1.414 3.323c0 1.297-.539 2.448-1.414 3.323C10.897 16.645 9.746 17.135 8.449 17.135z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
              <Link to='#' className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Twitter</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100'>
              Products
            </h3>
            <ul role='list' className='mt-6 space-y-4'>
              <li className='text-sm'>
                <Link
                  to='/bags'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Bags
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/tees'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Tees
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/objects'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Objects
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/home-goods'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Home Goods
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/accessories'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100'>
              Customer Service
            </h3>
            <ul role='list' className='mt-6 space-y-4'>
              <li className='text-sm'>
                <Link
                  to='/contact'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/shipping'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Shipping
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/returns'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Returns
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/warranty'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Warranty
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/faq'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100'>
              Company
            </h3>
            <ul role='list' className='mt-6 space-y-4'>
              <li className='text-sm'>
                <Link
                  to='/about'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  About
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/careers'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Careers
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/press'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Press
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/sustainability'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Sustainability
                </Link>
              </li>
              <li className='text-sm'>
                <Link
                  to='/privacy'
                  className='leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='mt-16 border-t border-gray-900/10 pt-12 dark:border-gray-700'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            <div>
              <h3 className='text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100'>
                Stay updated
              </h3>
              <p className='mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400'>
                Get the latest news, articles, and resources delivered to your
                inbox weekly.
              </p>
            </div>
            <div>
              <form className='flex gap-4'>
                <input
                  id='email-address'
                  type='email'
                  required
                  autoComplete='email'
                  placeholder='Enter your email'
                  className='flex-1 min-w-0 appearance-none rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500'
                />
                <button
                  type='submit'
                  className='flex-shrink-0 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors'
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t border-gray-900/10 pt-8 dark:border-gray-700'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-sm leading-5 text-gray-500 dark:text-gray-400'>
              © 2025 BeeLuxe. All rights reserved.
            </p>
            <div className='flex items-center gap-6'>
              <Link
                to='/terms'
                className='text-sm leading-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
              >
                Terms
              </Link>
              <Link
                to='/privacy'
                className='text-sm leading-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
              >
                Privacy
              </Link>
              <Link
                to='/cookies'
                className='text-sm leading-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
