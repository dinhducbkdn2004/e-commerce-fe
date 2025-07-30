import ProtectedRoute from '@/components/ProtectedRoute'
import { MainLayout } from '@/layouts'
import EmailVerificationPage from '@pages/EmailVerification/EmailVerificationPage'
import ResendVerificationPage from '@pages/EmailVerification/ResendVerificationPage'
import ForgotPasswordPage from '@pages/ForgotPasswordPage/ForgotPasswordPage'
import Home from '@pages/Home/Home'
import LoginPage from '@pages/LoginPage/LoginPage'
import NotFound from '@pages/NotFound/NotFound'
import RegisterPage from '@pages/RegisterPage/RegisterPage'
import ResetPasswordPage from '@pages/ResetPasswordPage/ResetPasswordPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />

        {/* Auth routes - only for non-authenticated users */}
        <Route
          path='/login'
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute requireAuth={false}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute requireAuth={false}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        {/* Email verification routes - public access */}
        <Route path='/auth/verify-email' element={<EmailVerificationPage />} />
        <Route
          path='/auth/resend-verification'
          element={<ResendVerificationPage />}
        />
        <Route
          path='/auth/reset-password'
          element={
            <ProtectedRoute requireAuth={false}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes - only for authenticated users */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute requireAuth={true}>
              <div className='p-8'>
                <h1 className='text-2xl font-bold'>User Profile</h1>
                <p>This is a protected route.</p>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute requireAuth={true}>
              <div className='p-8'>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
                <p>Welcome to your dashboard!</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* 404 route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  )
}

export default App
