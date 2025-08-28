import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface ProductSkeletonProps {
  viewMode?: 'grid' | 'list'
  count?: number
}

export default function ProductSkeleton({
  viewMode = 'grid',
  count = 8,
}: ProductSkeletonProps) {
  if (viewMode === 'list') {
    return (
      <div className='space-y-4'>
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className='overflow-hidden card-glass'>
            <div className='flex'>
              <div className='w-48 h-36 flex-shrink-0 bg-purple-100 dark:bg-purple-900/20 animate-pulse' />
              <div className='flex-1 p-4 space-y-3'>
                <div className='h-6 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-3/4' />
                <div className='h-4 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-1/2' />
                <div className='h-4 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-1/4' />
                <div className='flex justify-between items-end mt-4'>
                  <div className='space-y-2'>
                    <div className='h-5 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-20' />
                    <div className='h-3 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-16' />
                  </div>
                  <div className='h-9 w-24 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded' />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className='overflow-hidden card-glass'>
          <div className='aspect-[4/3] bg-purple-100 dark:bg-purple-900/20 animate-pulse' />
          <CardHeader className='pb-2'>
            <div className='h-5 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-full' />
            <div className='h-4 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-2/3' />
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='h-4 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-1/2' />
            <div className='h-5 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-1/3' />
            <div className='flex flex-wrap gap-1'>
              <div className='h-5 w-12 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded' />
              <div className='h-5 w-16 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded' />
            </div>
            <div className='h-9 bg-purple-100 dark:bg-purple-900/20 animate-pulse rounded w-full' />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
