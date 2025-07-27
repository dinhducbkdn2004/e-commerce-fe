import { ThemeToggle } from '@/components/ThemeToggle'
import { LoginForm } from '@/features/auth/components/login-form'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='min-h-svh bg-white dark:bg-black'>
      {/* Simple Header for Auth Pages */}
      <header className='absolute top-0 left-0 right-0 z-50 p-4 sm:p-6'>
        <div className='flex items-center justify-between'>
          <Link to='/' className='flex items-center space-x-2 group'>
            <div className='relative'>
              <div className='w-7 h-7 bg-gradient-to-br from-purple-600 to-indigo-600 transform rotate-45 rounded-sm group-hover:scale-110 transition-transform duration-300'></div>
              <div className='absolute inset-1 bg-white dark:bg-black transform rotate-45 rounded-sm'></div>
            </div>
            <span className='text-lg font-light tracking-wider text-gray-900 dark:text-white'>
              Bee
              <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
                Luxe
              </span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
