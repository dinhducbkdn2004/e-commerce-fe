import { useTheme } from '@hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className='text-lg'>{theme === 'light' ? '🌙' : '☀️'}</span>
      <span className='text-sm font-medium'>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  )
}
