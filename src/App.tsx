import { MainLayout } from '@/layouts'
import { ThemeProvider } from '@contexts/ThemeContext'
import Home from '@pages/Home/Home'
import LoginPage from '@pages/LoginPage/LoginPage'
import NotFound from '@pages/NotFound/NotFound'
import RegisterPage from '@pages/RegisterPage/RegisterPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* Add other routes as needed */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
