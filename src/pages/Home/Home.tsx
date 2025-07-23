import {
  CategorySection,
  FavoritesSection,
  FeatureSection,
  HeroSection,
  SaleSection,
  TestimonialSection,
} from '@/components/sections'

export default function Home() {
  return (
    <div className='mx-auto'>
      <HeroSection />
      <CategorySection />
      <FeatureSection />
      <FavoritesSection />
      <SaleSection />
      <TestimonialSection />
    </div>
  )
}
