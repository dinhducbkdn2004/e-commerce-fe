import ProtectedRoute from '@/components/ProtectedRoute'
import { MainLayout } from '@/layouts'
import Home from '@pages/Home/Home'
import LoginPage from '@pages/LoginPage/LoginPage'
import NotFound from '@pages/NotFound/NotFound'
import RegisterPage from '@pages/RegisterPage/RegisterPage'
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
