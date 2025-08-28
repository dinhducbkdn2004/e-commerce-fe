import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className='flex items-center space-x-1 text-sm text-purple-600 dark:text-purple-400 mb-6'>
      <Link
        to='/'
        className='flex items-center hover:text-purple-700 dark:hover:text-purple-300 transition-colors'
      >
        <Home className='h-4 w-4' />
      </Link>

      {items.map((item, index) => (
        <div key={index} className='flex items-center space-x-1'>
          <ChevronRight className='h-4 w-4' />
          {item.href ? (
            <Link
              to={item.href}
              className='hover:text-purple-700 dark:hover:text-purple-300 transition-colors'
            >
              {item.label}
            </Link>
          ) : (
            <span className='text-purple-800 dark:text-purple-200 font-medium'>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
