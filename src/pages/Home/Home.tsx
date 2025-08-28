import { HeroSection } from '@/components/sections'
import { Suspense, lazy } from 'react'

// Lazy load non-critical sections
const CategorySection = lazy(() => import('@/components/sections').then(module => ({ default: module.CategorySection })))
const FeatureSection = lazy(() => import('@/components/sections').then(module => ({ default: module.FeatureSection })))
const FavoritesSection = lazy(() => import('@/components/sections').then(module => ({ default: module.FavoritesSection })))
const SaleSection = lazy(() => import('@/components/sections').then(module => ({ default: module.SaleSection })))
const TestimonialSection = lazy(() => import('@/components/sections').then(module => ({ default: module.TestimonialSection })))

// Loading component for sections
const SectionSkeleton = () => (
  <div className="animate-pulse py-16 sm:py-20 lg:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
)

export default function Home() {
  return (
    <div className='mx-auto'>
      {/* Load HeroSection immediately as it's above the fold */}
      <HeroSection />

      {/* Lazy load other sections with suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <CategorySection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FeatureSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FavoritesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <SaleSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialSection />
      </Suspense>
    </div>
  )
}
