import { useEffect, useRef, useState } from 'react'
import { useLazyImage } from '@/hooks/useLazyImage'

interface SmoothScrollWrapperProps {
  children: React.ReactNode
  className?: string
}

export function SmoothScrollWrapper({
  children,
  className = '',
}: SmoothScrollWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add smooth scrolling behavior to all internal links
    const handleInternalLinks = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault()
        const targetElement = document.querySelector(target.hash)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    }

    // Add reveal animations to elements as they come into view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, observerOptions)

    // Observe all elements with 'reveal' class
    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))

    // Add event listener for smooth internal links
    document.addEventListener('click', handleInternalLinks)

    return () => {
      observer.disconnect()
      document.removeEventListener('click', handleInternalLinks)
    }
  }, [])

  return (
    <div ref={wrapperRef} className={`smooth-scroll-wrapper ${className}`}>
      {children}
    </div>
  )
}

// Enhanced image component with lazy loading and fade-in
interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
}

export function LazyImage({
  src,
  alt,
  className = '',
  placeholder,
}: LazyImageProps) {
  const [imageSrc, setImageRef] = useLazyImage(src)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder or skeleton */}
      {!imageSrc && (
        <div className='absolute inset-0 bg-gray-200 dark:bg-gray-700 skeleton'>
          {placeholder && (
            <img
              src={placeholder}
              alt=''
              className='w-full h-full object-cover opacity-20'
            />
          )}
        </div>
      )}

      {/* Actual image */}
      <img
        ref={setImageRef}
        src={imageSrc || ''}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading='lazy'
      />
    </div>
  )
}
