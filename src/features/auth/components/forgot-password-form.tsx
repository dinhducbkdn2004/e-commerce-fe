import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { validateForgotPasswordForm } from '@/schemas/validation'
import { authService } from '@/services/authService'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    const validation = validateForgotPasswordForm({ email })
    if (!validation.isValid) {
      validation.errors.forEach((error, index) => {
        setTimeout(() => {
          toast.error('Validation Error', {
            description: error,
          })
        }, index * 200)
      })
      return
    }

    setIsLoading(true)
    try {
      await authService.forgotPassword(email)
      setIsSubmitted(true)
      toast.success('Reset link sent!', {
        description: 'Please check your email for password reset instructions.',
      })
    } catch (err) {
      console.error('Forgot password failed:', err)
      toast.error('Failed to send reset link', {
        description: 'Please try again or contact support.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  if (isSubmitted) {
    return (
      <div
        className={cn('flex flex-col gap-6 max-w-md mx-auto', className)}
        {...props}
      >
        <Card className='bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-white/60 dark:border-gray-600/60 shadow-2xl shadow-purple-500/20 ring-1 ring-white/20 dark:ring-gray-600/30'>
          <CardHeader className='text-center'>
            <div className='mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4'>
              <svg
                className='w-8 h-8 text-green-600 dark:text-green-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <CardTitle className='text-xl'>Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to{' '}
              <span className='font-medium text-purple-600 dark:text-purple-400'>
                {email}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-sm text-muted-foreground text-center'>
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className='text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline underline-offset-4'
                >
                  try again
                </button>
              </p>
              <Button
                asChild
                className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0'
              >
                <Link to='/login'>Back to login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={cn('flex flex-col gap-6 max-w-md mx-auto', className)}
      {...props}
    >
      <Card className='bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-white/60 dark:border-gray-600/60 shadow-2xl shadow-purple-500/20 ring-1 ring-white/20 dark:ring-gray-600/30'>
        <CardHeader className='text-center'>
          <div className='mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4'>
            <svg
              className='w-8 h-8 text-purple-600 dark:text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
              />
            </svg>
          </div>
          <CardTitle className='text-xl'>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='m@example.com'
                  value={email}
                  onChange={handleInputChange}
                  className='bg-white/50 dark:bg-gray-800/60 border-gray-300/50 dark:border-gray-600/50 backdrop-blur-sm focus:bg-white/70 dark:focus:bg-gray-800/80 focus:border-purple-400 dark:focus:border-purple-500'
                  required
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0'
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>
              <div className='text-center text-sm'>
                Remember your password?{' '}
                <Link
                  to='/login'
                  className='underline underline-offset-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
                >
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className='text-muted-foreground text-center text-xs text-balance'>
        By clicking continue, you agree to our{' '}
        <a
          href='#'
          className='underline underline-offset-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href='#'
          className='underline underline-offset-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}
