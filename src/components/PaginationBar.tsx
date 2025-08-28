import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationBarProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationBarProps) {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  })

  if (totalPages <= 1) return null

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant='outline'
        size='sm'
        onClick={onPrevious}
        disabled={currentPage === 1}
        className='flex items-center gap-1 border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20 disabled:opacity-50'
      >
        <ChevronLeft className='h-4 w-4' />
        Trước
      </Button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <span key={index} className='px-2 text-purple-600 dark:text-purple-400'>
              ...
            </span>
          )
        }

        return (
          <Button
            key={index}
            variant={pageNumber === currentPage ? 'default' : 'outline'}
            size='sm'
            onClick={() => onPageChange(pageNumber as number)}
            className={`w-10 h-10 ${
              pageNumber === currentPage
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-lg'
                : 'border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
            }`}
          >
            {pageNumber}
          </Button>
        )
      })}

      <Button
        variant='outline'
        size='sm'
        onClick={onNext}
        disabled={currentPage === totalPages}
        className='flex items-center gap-1 border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20 disabled:opacity-50'
      >
        Sau
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  )
}
