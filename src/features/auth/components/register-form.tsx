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
import { useAuth } from '@/features/auth/hooks/useAuth'
import { cn } from '@/lib/utils'
import { validateRegisterForm } from '@/schemas/validation'
import type { RegisterFormData as RegisterFormType } from '@/types'
import { useState } from 'react'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { register, isLoading, error } = useAuth()
  const [formData, setFormData] = useState<RegisterFormType>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    const validation = validateRegisterForm(formData)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    // Clear validation errors if valid
    setValidationErrors([])

    try {
      const result = await register(formData)
      console.log('Registration successful:', result)
      // Redirect hoặc update UI sau khi đăng ký thành công
      window.location.href = '/login' // hoặc sử dụng react-router navigate
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create your account</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
              <div className='flex flex-col gap-4'>
                <Button variant='outline' className='w-full' type='button'>
                  {/* Apple SVG */}
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
                      fill='currentColor'
                    />
                  </svg>
                  Sign up with Apple
                </Button>
                <Button variant='outline' className='w-full' type='button'>
                  {/* Google SVG */}
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-card text-muted-foreground relative z-10 px-2'>
                  Or continue with
                </span>
              </div>

              {/* Hiển thị validation errors */}
              {validationErrors.length > 0 && (
                <div className='text-red-500 text-sm bg-red-50 p-3 rounded'>
                  <ul className='list-disc list-inside space-y-1'>
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hiển thị API error */}
              {error && (
                <div className='text-red-500 text-sm text-center bg-red-50 p-2 rounded'>
                  {error}
                </div>
              )}

              <div className='grid gap-6'>
                {/* Two column layout for form fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='grid gap-3'>
                    <Label htmlFor='fullName'>Full Name</Label>
                    <Input
                      id='fullName'
                      name='name'
                      type='text'
                      placeholder='John Doe'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='m@example.com'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Min. 8 characters'
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      placeholder='Re-enter your password'
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Phone number takes full width */}
                <div className='grid gap-3'>
                  <Label htmlFor='phoneNumber'>Phone Number</Label>
                  <Input
                    id='phoneNumber'
                    name='phoneNumber'
                    type='tel'
                    placeholder='123-456-7890'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Create Account'}
                </Button>
              </div>
              <div className='text-center text-sm'>
                Already have an account?{' '}
                <a href='/login' className='underline underline-offset-4'>
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By creating an account, you agree to our{' '}
        <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  )
}
