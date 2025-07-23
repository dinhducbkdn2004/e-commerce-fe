import { useIntersectionObserver } from '@/hooks/useScroll'
import { useRef } from 'react'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(ref as React.RefObject<HTMLDivElement>, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  })

  const getTransformClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8'
      case 'down':
        return '-translate-y-8'
      case 'left':
        return 'translate-x-8'
      case 'right':
        return '-translate-x-8'
      default:
        return 'translate-y-8'
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting
          ? 'opacity-100 translate-y-0 translate-x-0'
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
      style={{
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}

interface SlideInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'left' | 'right'
}

export function SlideInSection({
  children,
  className = '',
  delay = 0,
  direction = 'left',
}: SlideInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(ref as React.RefObject<HTMLDivElement>)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${direction === 'left' ? '-translate-x-12' : 'translate-x-12'}`
      } ${className}`}
      style={{
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}

interface ScaleInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScaleInSection({
  children,
  className = '',
  delay = 0,
}: ScaleInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(ref as React.RefObject<HTMLDivElement>)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      style={{
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}
