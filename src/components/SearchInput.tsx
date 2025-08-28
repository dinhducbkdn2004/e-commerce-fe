import { useDebounce } from '@/hooks/useDebounce'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Tìm kiếm sản phẩm...',
  debounceMs = 300,
  className = '',
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const debouncedValue = useDebounce(inputValue, debounceMs)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, value])

  const handleClear = () => {
    setInputValue('')
    onChange('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChange(inputValue)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Search className='h-4 w-4 text-purple-600 dark:text-purple-400' />
      </div>

      <input
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='block w-full pl-10 pr-10 py-2 border border-purple-300/60 dark:border-purple-600 bg-white/95 dark:bg-gray-800/80 backdrop-blur-sm rounded-md text-sm text-gray-700 dark:text-gray-200 placeholder:text-purple-500/70 dark:placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400 focus:border-purple-400 dark:focus:border-transparent shadow-sm'
      />

      {inputValue && (
        <button
          onClick={handleClear}
          className='absolute inset-y-0 right-0 pr-3 flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
        >
          <X className='h-4 w-4' />
        </button>
      )}
    </div>
  )
}
