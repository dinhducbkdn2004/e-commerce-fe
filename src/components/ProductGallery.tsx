import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export default function ProductGallery({
  images,
  productName,
  className = '',
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const validImages = images.filter(img => img && img.trim() !== '')
  const currentImage = validImages[selectedImageIndex] || validImages[0]

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  const handlePrevImage = () => {
    setSelectedImageIndex(prev =>
      prev === 0 ? validImages.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setSelectedImageIndex(prev =>
      prev === validImages.length - 1 ? 0 : prev + 1
    )
  }

  if (validImages.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className='aspect-square rounded-xl bg-muted flex items-center justify-center'>
          <div className='text-muted-foreground text-center'>
            <svg
              className='w-16 h-16 mx-auto mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <p>Không có hình ảnh</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className='relative group'>
        <div className='aspect-square overflow-hidden rounded-xl bg-muted border relative'>
          {!imageLoaded[selectedImageIndex] &&
            !imageErrors[selectedImageIndex] && (
              <div className='absolute inset-0 bg-muted animate-pulse' />
            )}

          {!imageErrors[selectedImageIndex] ? (
            <img
              src={currentImage}
              alt={`${productName} - Hình ${selectedImageIndex + 1}`}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded[selectedImageIndex] ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(selectedImageIndex)}
              onError={() => handleImageError(selectedImageIndex)}
            />
          ) : (
            <div className='h-full w-full flex items-center justify-center bg-muted text-muted-foreground'>
              <svg
                className='w-16 h-16'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
          )}

          {/* Navigation Arrows */}
          {validImages.length > 1 && (
            <>
              <Button
                variant='secondary'
                size='icon'
                className='absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity'
                onClick={handlePrevImage}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='secondary'
                size='icon'
                className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity'
                onClick={handleNextImage}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </>
          )}

          {/* Zoom Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='secondary'
                size='icon'
                className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <Expand className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-4xl max-h-[90vh] p-2'>
              <div className='relative'>
                <img
                  src={currentImage}
                  alt={`${productName} - Phóng to`}
                  className='w-full h-auto max-h-[80vh] object-contain rounded-lg'
                />
                {validImages.length > 1 && (
                  <div className='flex justify-center mt-4 gap-2'>
                    {validImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          idx === selectedImageIndex
                            ? 'bg-primary'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Counter */}
          {validImages.length > 1 && (
            <div className='absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded'>
              {selectedImageIndex + 1} / {validImages.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {validImages.length > 1 && (
        <div className='grid grid-cols-4 gap-2'>
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                idx === selectedImageIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-muted hover:border-border'
              }`}
            >
              <img
                src={img}
                alt={`${productName} ${idx + 1}`}
                className='h-full w-full object-cover'
                loading='lazy'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

