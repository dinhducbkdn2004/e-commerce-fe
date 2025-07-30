import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { authService } from '@/services'
import { ArrowRight, CheckCircle, Loader, Mail, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

type VerificationStatus = 'loading' | 'success' | 'error' | 'expired'

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<VerificationStatus>('loading')
  const [message, setMessage] = useState('')
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error')
        setMessage('Verification token is missing')
        return
      }

      try {
        await authService.verifyEmail(token)
        setStatus('success')
        setMessage('Your email has been verified successfully!')
      } catch (error: unknown) {
        setStatus('error')
        if (error instanceof Error && error.message?.includes('expired')) {
          setStatus('expired')
          setMessage('Verification link has expired')
        } else {
          setMessage(
            error instanceof Error ? error.message : 'Email verification failed'
          )
        }
      }
    }

    verifyEmail()
  }, [token])

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className='text-center space-y-4'>
            <div className='mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center'>
              <Loader className='w-8 h-8 text-purple-600 animate-spin' />
            </div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Verifying your email...
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Please wait while we verify your email address.
            </p>
          </div>
        )

      case 'success':
        return (
          <div className='text-center space-y-6'>
            <div className='mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Email Verified!
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>{message}</p>
            </div>
            <div className='space-y-3'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                You can now enjoy our luxury collection. Welcome to BeeLuxe!
              </p>
              <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                <Link to='/login'>
                  <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'>
                    Sign In
                    <ArrowRight className='ml-2 w-4 h-4' />
                  </Button>
                </Link>
                <Link to='/'>
                  <Button variant='outline'>Browse Products</Button>
                </Link>
              </div>
            </div>
          </div>
        )

      case 'expired':
        return (
          <div className='text-center space-y-6'>
            <div className='mx-auto w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center'>
              <XCircle className='w-8 h-8 text-yellow-600' />
            </div>
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Link Expired
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>{message}</p>
            </div>
            <div className='space-y-3'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Don't worry! You can request a new verification email.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                <Link to='/auth/resend-verification'>
                  <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'>
                    <Mail className='mr-2 w-4 h-4' />
                    Resend Email
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button variant='outline'>Register Again</Button>
                </Link>
              </div>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className='text-center space-y-6'>
            <div className='mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
              <XCircle className='w-8 h-8 text-red-600' />
            </div>
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Verification Failed
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>{message}</p>
            </div>
            <div className='space-y-3'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Please try again or contact support if the problem persists.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                <Link to='/auth/resend-verification'>
                  <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'>
                    <Mail className='mr-2 w-4 h-4' />
                    Resend Email
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button variant='outline'>Register Again</Button>
                </Link>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className='min-h-screen y flex items-center justify-center p-6'>
      <Card className='w-full max-w-md bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-white/60 dark:border-gray-600/60 shadow-2xl shadow-purple-500/20'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-center mb-4'>
            <div className='relative'>
              <div className='w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 transform rotate-45 rounded-sm'></div>
              <div className='absolute inset-1 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transform rotate-45 rounded-sm'></div>
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

export default EmailVerificationPage
