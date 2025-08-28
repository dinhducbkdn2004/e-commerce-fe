import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authService } from '@/services'
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ResendVerificationPage = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement API call to resend verification email
      await authService.resendVerificationEmail(email)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      setIsSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to resend verification email'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const renderContent = () => {
    if (isSuccess) {
      return (
        <div className='text-center space-y-6'>
          <div className='mx-auto w-16 h-16 rounded-full flex items-center justify-center'>
            <CheckCircle className='w-8 h-8 text-green-600' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Email Sent!
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              We've sent a new verification email to <strong>{email}</strong>
            </p>
          </div>
          <div className='space-y-3'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Please check your inbox and click the verification link to
              activate your account.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Link to='/login'>
                <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'>
                  Go to Login
                </Button>
              </Link>
              <Button
                variant='outline'
                onClick={() => {
                  setIsSuccess(false)
                  setEmail('')
                }}
              >
                Send Another
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='space-y-6'>
        <div className='text-center space-y-2'>
          <div className='mx-auto w-16 h-16 rounded-full flex items-center justify-center'>
            <Mail className='w-8 h-8 text-purple-600' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Resend Verification Email
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Enter your email address and we'll send you a new verification link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='bg-white/50 dark:bg-gray-800/60 border-gray-300/50 dark:border-gray-600/50 backdrop-blur-sm focus:bg-white/70 dark:focus:bg-gray-800/80 focus:border-purple-400 dark:focus:border-purple-500'
              required
            />
          </div>

          {error && (
            <div className='text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md'>
              {error}
            </div>
          )}

          <Button
            type='submit'
            disabled={isLoading}
            className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
          >
            {isLoading ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                Sending...
              </>
            ) : (
              <>
                <Mail className='mr-2 w-4 h-4' />
                Send Verification Email
              </>
            )}
          </Button>
        </form>

        <div className='text-center'>
          <Link
            to='/register'
            className='inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
          >
            <ArrowLeft className='mr-1 w-4 h-4' />
            Back to Register
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
      <Card className='w-full max-w-md bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-white/60 dark:border-gray-600/60 shadow-2xl shadow-purple-500/20'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-center mb-4'>
            <div className='relative'>
              <div className='w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 transform rotate-45 rounded-sm'></div>
              <div className='absolute inset-1 bg-auth-section transform rotate-45 rounded-sm'></div>
            </div>
            <span className='ml-3 text-xl font-light tracking-wider text-gray-900 dark:text-white'>
              Bee
              <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
                Luxe
              </span>
            </span>
          </div>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}

export default ResendVerificationPage
