import { useEffect, useState } from 'react'

// Hook for lazy loading images
export function useLazyImage(src: string) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    let observer: IntersectionObserver

    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src)
              observer.unobserve(imageRef)
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(imageRef)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [imageRef, imageSrc, src])

  return [imageSrc, setImageRef] as const
}
