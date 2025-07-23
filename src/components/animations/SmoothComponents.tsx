import { useParallax, useScroll } from '@/hooks/useScroll'
import { useRef } from 'react'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const offset = useParallax(speed)

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  )
}

interface StickyHeaderProps {
  children: React.ReactNode
  className?: string
}

export function StickyHeader({ children, className = '' }: StickyHeaderProps) {
  const { scrollDirection, isScrolled } = useScroll({ threshold: 50 })

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      } ${
        scrollDirection === 'down' && isScrolled
          ? '-translate-y-full'
          : 'translate-y-0'
      } ${className}`}
    >
      {children}
    </header>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600 ${sizeClasses[size]} ${className}`}
    />
  )
}

interface ProgressBarProps {
  className?: string
}

export function ProgressBar({ className = '' }: ProgressBarProps) {
  const { scrollY } = useScroll()
  const progress = Math.min(
    (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) *
      100,
    100
  )

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50 ${className}`}
    >
      <div
        className='h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-150 ease-out'
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
