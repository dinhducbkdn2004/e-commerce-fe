import { MainLayout } from '@/layouts'
import { ThemeProvider } from '@contexts/ThemeContext'
import Home from '@pages/Home/Home'
import NotFound from '@pages/NotFound/NotFound'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
