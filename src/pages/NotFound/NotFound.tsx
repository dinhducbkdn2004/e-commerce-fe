import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-gray-200 dark:text-gray-700'>
          404
        </h1>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
          Page Not Found
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8 max-w-md'>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to='/'
          className='inline-flex items-center px-6 py-3 dark:bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors'
        >
          <svg
            className='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
