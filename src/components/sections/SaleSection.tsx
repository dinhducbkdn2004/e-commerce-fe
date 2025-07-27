import {
  FadeInSection,
  SlideInSection,
} from '@/components/animations/AnimatedSections'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Percent, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SaleSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-32 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000'></div>
      </div>

      <div className='relative py-16 sm:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            {/* Left side - Content */}
            <SlideInSection
              direction='left'
              className='text-center lg:text-left relative z-10'
            >
              {/* Badge */}
              <div className='flex justify-center lg:justify-start mb-6'>
                <Badge
                  variant='outline'
                  className='px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white'
                >
                  <Percent className='w-4 h-4 mr-2' />
                  Flash Sale Event
                </Badge>
              </div>

              {/* Heading */}
              <h2 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6'>
                Final Stock
                <span className='block text-yellow-300 mt-2'>
                  Up to 50% Off
                </span>
              </h2>

              {/* Description */}
              <p className='text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                Last chance to grab your favorite luxury items at incredible
                prices. Limited quantities available - don't miss out!
              </p>

              {/* Stats */}
              <div className='flex flex-wrap justify-center lg:justify-start gap-6 mb-10'>
                <div className='flex items-center space-x-2 text-white'>
                  <Clock className='w-5 h-5 text-yellow-300' />
                  <span className='text-sm'>Ends in 48 hours</span>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <Zap className='w-5 h-5 text-yellow-300' />
                  <span className='text-sm'>Free shipping included</span>
                </div>
              </div>

              {/* CTAs */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 sm:mb-0'>
                <Link to='/sale' className='w-full sm:w-auto'>
                  <Button
                    size='lg'
                    className='w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl'
                  >
                    Shop Sale Now
                    <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
                <Link to='/new-arrivals' className='w-full sm:w-auto'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='w-full sm:w-auto border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/10'
                  >
                    View New Arrivals
                  </Button>
                </Link>
              </div>
            </SlideInSection>

            {/* Right side - Product Showcase */}
            <FadeInSection
              delay={200}
              className='relative min-h-[400px] lg:h-[500px] mt-8 lg:mt-0'
            >
              {/* Main featured product */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='relative group max-w-sm w-full mx-4 lg:mx-0'>
                  <div className='absolute inset-0 bg-white rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300'></div>
                  <div className='relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl'>
                    <div className='aspect-square overflow-hidden rounded-2xl mb-4'>
                      <img
                        src='https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
                        alt='Featured sale product'
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                    <div className='text-center'>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                        Designer Sneakers
                      </h3>
                      <div className='flex items-center justify-center space-x-2 mb-3'>
                        <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                          $89
                        </span>
                        <span className='text-lg text-gray-500 dark:text-gray-400 line-through'>
                          $179
                        </span>
                        <Badge
                          variant='destructive'
                          className='bg-gradient-to-r from-red-500 to-pink-500 border-0'
                        >
                          50% OFF
                        </Badge>
                      </div>
                      <Button
                        size='sm'
                        className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0'
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating product cards */}
              <div className='hidden lg:block'>
                {/* Top left card */}
                <div className='absolute top-8 left-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl transform rotate-6 hover:rotate-3 transition-transform duration-300'>
                  <div className='w-20 h-20 overflow-hidden rounded-xl mb-2'>
                    <img
                      src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
                      alt='Sale item'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-medium text-gray-900 dark:text-white'>
                    Silk Scarf
                  </p>
                  <div className='flex items-center space-x-1'>
                    <p className='text-xs font-bold text-purple-600'>$39</p>
                    <p className='text-xs text-gray-500 line-through'>$79</p>
                  </div>
                </div>

                {/* Top right card */}
                <div className='absolute top-16 right-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl transform -rotate-6 hover:-rotate-3 transition-transform duration-300'>
                  <div className='w-20 h-20 overflow-hidden rounded-xl mb-2'>
                    <img
                      src='https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
                      alt='Sale item'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-medium text-gray-900 dark:text-white'>
                    Leather Bag
                  </p>
                  <div className='flex items-center space-x-1'>
                    <p className='text-xs font-bold text-purple-600'>$199</p>
                    <p className='text-xs text-gray-500 line-through'>$399</p>
                  </div>
                </div>

                {/* Bottom left card */}
                <div className='absolute bottom-16 left-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl transform rotate-3 hover:rotate-1 transition-transform duration-300'>
                  <div className='w-20 h-20 overflow-hidden rounded-xl mb-2'>
                    <img
                      src='https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
                      alt='Sale item'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-medium text-gray-900 dark:text-white'>
                    Blouse
                  </p>
                  <div className='flex items-center space-x-1'>
                    <p className='text-xs font-bold text-purple-600'>$89</p>
                    <p className='text-xs text-gray-500 line-through'>$149</p>
                  </div>
                </div>

                {/* Bottom right card */}
                <div className='absolute bottom-8 right-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl transform -rotate-3 hover:-rotate-1 transition-transform duration-300'>
                  <div className='w-20 h-20 overflow-hidden rounded-xl mb-2'>
                    <img
                      src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
                      alt='Sale item'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-xs font-medium text-gray-900 dark:text-white'>
                    Watch
                  </p>
                  <div className='flex items-center space-x-1'>
                    <p className='text-xs font-bold text-purple-600'>$129</p>
                    <p className='text-xs text-gray-500 line-through'>$259</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Bottom banner */}
          <div className='mt-16 text-center'>
            <div className='inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 sm:px-8 py-4 shadow-lg'>
              <div className='flex items-center space-x-2 text-white'>
                <div className='w-2 h-2 bg-yellow-300 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium'>Limited Time Only</span>
              </div>
              <div className='hidden sm:block w-px h-4 bg-white/30'></div>
              <div className='flex items-center space-x-2 text-white'>
                <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium'>Free Returns</span>
              </div>
              <div className='hidden sm:block w-px h-4 bg-white/30'></div>
              <div className='flex items-center space-x-2 text-white'>
                <div className='w-2 h-2 bg-blue-300 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium'>Authentic Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
