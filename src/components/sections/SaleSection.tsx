import {
  FadeInSection,
  SlideInSection,
} from '@/components/animations/AnimatedSections'
import { Link } from 'react-router-dom'

export default function SaleSection() {
  return (
    <section aria-labelledby='sale-heading'>
      <div className='relative overflow-hidden bg-gray-100 dark:bg-gray-600'>
        <div className='py-12 lg:py-16'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              {/* Left side - Heading */}
              <SlideInSection
                direction='left'
                className='text-center lg:text-left'
              >
                <h2
                  id='sale-heading'
                  className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl'
                >
                  Final Stock.
                  <br />
                  Up to 50% off.
                </h2>
                <div className='mt-8'>
                  <Link
                    to='/sale'
                    className='inline-flex items-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 transition-colors'
                  >
                    Shop the sale
                    <span aria-hidden='true'> →</span>
                  </Link>
                </div>
              </SlideInSection>

              {/* Right side - Images with unique positioning */}
              <FadeInSection
                delay={200}
                className='relative h-80 lg:h-96 overflow-hidden'
              >
                {/* Image 1 - Top left */}
                <div className='absolute top-0 left-0 w-32 h-40 lg:w-40 lg:h-48 overflow-hidden rounded-lg shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300'>
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                </div>

                {/* Image 2 - Top right */}
                <div className='absolute top-8 right-0 w-36 h-44 lg:w-44 lg:h-52 overflow-hidden rounded-lg shadow-lg transform -rotate-2 hover:rotate-1 transition-transform duration-300'>
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                </div>

                {/* Image 3 - Center left */}
                <div className='absolute top-20 left-16 w-28 h-36 lg:w-36 lg:h-44 overflow-hidden rounded-lg shadow-lg transform rotate-6 hover:rotate-3 transition-transform duration-300 z-10'>
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-01.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                </div>

                {/* Image 4 - Bottom center */}
                <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-48 lg:w-48 lg:h-56 overflow-hidden rounded-lg shadow-lg rotate-1 hover:-rotate-2 transition-transform duration-300'>
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-02.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                </div>

                {/* Image 5 - Bottom right */}
                <div className='absolute bottom-0 right-8 w-32 h-40 lg:w-40 lg:h-48 overflow-hidden rounded-lg shadow-lg transform -rotate-4 hover:-rotate-1 transition-transform duration-300'>
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                </div>

                {/* Image 6 - Center right */}
                <div className='absolute top-32 right-16 w-28 h-36 lg:w-36 lg:h-44 overflow-hidden rounded-lg shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300 z-20'>
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                </div>

                {/* Decorative gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-r rounded-lg from-gray-50/20 to-transparent pointer-events-none'></div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
