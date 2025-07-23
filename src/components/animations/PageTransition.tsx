import { useEffect, useState } from 'react'
import { LoadingSpinner } from './SmoothComponents'

interface PageTransitionProps {
  children: React.ReactNode
  loading?: boolean
}

export function PageTransition({
  children,
  loading = false,
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsVisible(true), 50)
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

interface SmoothLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  offset?: number
}

export function SmoothLink({
  href,
  children,
  className = '',
  offset = 80,
}: SmoothLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.slice(1)
      const element = document.getElementById(targetId)

      if (element) {
        const top = element.offsetTop - offset
        window.scrollTo({
          top,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <a
      href={href}
      className={`transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

interface StaggeredAnimationProps {
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredAnimation({
  children,
  staggerDelay = 100,
  className = '',
}: StaggeredAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className='transition-all duration-700 ease-out'
          style={{
            animationDelay: `${index * staggerDelay}ms`,
            animationFillMode: 'both',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
