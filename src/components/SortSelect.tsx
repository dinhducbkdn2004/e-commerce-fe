import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface SortOption {
  value: string
  label: string
}

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
  options?: SortOption[]
}

const defaultOptions: SortOption[] = [
  { value: 'createdAt-desc', label: 'Mới nhất' },
  { value: 'sales-desc', label: 'Bán chạy nhất' },
  { value: 'rating-desc', label: 'Đánh giá cao nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
  { value: 'views-desc', label: 'Xem nhiều nhất' },
]

export default function SortSelect({
  value,
  onChange,
  options = defaultOptions,
}: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-[180px] border-purple-300/60 dark:border-purple-600 focus:ring-purple-500/50 dark:focus:ring-purple-400 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-200 shadow-sm'>
        <SelectValue placeholder='Sắp xếp theo' />
      </SelectTrigger>
      <SelectContent className='border-purple-300/60 dark:border-purple-600 bg-white/98 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg'>
        {options.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
            className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 focus:bg-purple-100/80 dark:focus:bg-purple-900/20 text-gray-700 dark:text-gray-200'
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
