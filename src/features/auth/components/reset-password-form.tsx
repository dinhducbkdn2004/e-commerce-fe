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
import { validateResetPasswordForm } from '@/schemas/validation'
import { authService } from '@/services/authService'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      toast.error('Invalid reset link', {
        description: 'Please request a new password reset link.',
      })
      return
    }

    // Validate form data
    const validation = validateResetPasswordForm(formData)
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
      // console.log('formdata: ', formData)
      await authService.resetPassword(token, formData.newPassword)
      setIsSuccess(true)
      toast.success('Password reset successfully!', {
        description: 'You can now login with your new password.',
      })
    } catch (err) {
      console.error('Reset password failed:', err)
      toast.error('Failed to reset password', {
        description: 'The link may be expired. Please request a new one.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  if (isSuccess) {
    navigate('/login')
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
          <CardTitle className='text-xl'>Reset your password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input
                  id='newPassword'
                  name='newPassword'
                  type='password'
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder='Enter your new password'
                  className='bg-white/50 dark:bg-gray-800/60 border-gray-300/50 dark:border-gray-600/50 backdrop-blur-sm focus:bg-white/70 dark:focus:bg-gray-800/80 focus:border-purple-400 dark:focus:border-purple-500'
                  required
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder='Confirm your new password'
                  className='bg-white/50 dark:bg-gray-800/60 border-gray-300/50 dark:border-gray-600/50 backdrop-blur-sm focus:bg-white/70 dark:focus:bg-gray-800/80 focus:border-purple-400 dark:focus:border-purple-500'
                  required
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0'
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset password'}
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
