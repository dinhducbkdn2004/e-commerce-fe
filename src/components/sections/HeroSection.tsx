import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, ShoppingBag, Star, Users } from 'lucide-react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-hero-section'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px] sm:min-h-[600px]'>
            {/* Left Content */}
            <div className='text-center lg:text-left flex flex-col justify-center'>
              {/* Badge */}
              <div className='flex justify-center lg:justify-start mb-6'>
                <Badge
                  variant='outline'
                  className='px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-700'
                >
                  <Star className='w-4 h-4 mr-2 text-yellow-500 fill-current' />
                  New Collection 2025
                </Badge>
              </div>

              {/* Main Heading */}
              <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-tight'>
                Luxury
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 block'>
                  Redefined
                </span>
              </h1>

              {/* Subtitle */}
              <p className='text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                Discover timeless elegance meets modern sophistication. Curated
                collections that speak to your unique style.
              </p>

              {/* Stats */}
              <div className='flex flex-wrap justify-center lg:justify-start gap-6 mb-10'>
                <div className='flex items-center space-x-2'>
                  <Users className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    50K+ Happy Customers
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Heart className='w-5 h-5 text-red-500' />
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    99% Satisfaction Rate
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12'>
                <Link to='/shop'>
                  <Button
                    size='lg'
                    className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto'
                  >
                    <ShoppingBag className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform' />
                    Shop Now
                    <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
                <Link to='/collections'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto'
                  >
                    View Collections
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className='pt-8 border-t border-gray-200 dark:border-gray-700'>
                <p className='text-sm text-gray-500 dark:text-gray-400 mb-4 text-center lg:text-left'>
                  Trusted by fashion enthusiasts worldwide
                </p>
                <div className='flex flex-wrap justify-center lg:justify-start gap-8 opacity-60'>
                  <div className='text-xs font-medium text-gray-400 dark:text-gray-500'>
                    VOGUE
                  </div>
                  <div className='text-xs font-medium text-gray-400 dark:text-gray-500'>
                    ELLE
                  </div>
                  <div className='text-xs font-medium text-gray-400 dark:text-gray-500'>
                    HARPER'S BAZAAR
                  </div>
                  <div className='text-xs font-medium text-gray-400 dark:text-gray-500'>
                    COSMOPOLITAN
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Content */}
            <div className='relative flex items-center justify-center lg:justify-end'>
              {/* Main product showcase */}
              <div className='relative z-10 max-w-md w-full'>
                {/* Large featured image */}
                <div className='relative group'>
                  <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300'></div>
                  <div className='relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl'>
                    <div className='aspect-[4/5] overflow-hidden rounded-2xl mb-6'>
                      <img
                        src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                        alt='Featured luxury handbag'
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                    <div className='text-center'>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                        Signature Leather Tote
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>
                        Handcrafted Italian Leather
                      </p>
                      <div className='flex items-center justify-center space-x-2'>
                        <span className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                          $299
                        </span>
                        <span className='text-lg text-gray-500 dark:text-gray-400 line-through'>
                          $399
                        </span>
                        <Badge variant='destructive' className='text-xs'>
                          25% OFF
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating product cards */}
                <div className='hidden lg:block'>
                  {/* Top right card */}
                  <div className='absolute -top-8 -right-12 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl transform rotate-6 hover:rotate-3 transition-transform duration-300'>
                    <div className='w-24 h-24 overflow-hidden rounded-xl mb-3'>
                      <img
                        src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2060&q=80'
                        alt='Elegant watch'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <p className='text-xs font-medium text-gray-900 dark:text-gray-100'>
                      Designer Watch
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      $189
                    </p>
                  </div>

                  {/* Bottom left card */}
                  <div className='absolute -bottom-8 -left-12 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl transform -rotate-6 hover:-rotate-3 transition-transform duration-300'>
                    <div className='w-24 h-24 overflow-hidden rounded-xl mb-3'>
                      <img
                        src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                        alt='Silk scarf'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <p className='text-xs font-medium text-gray-900 dark:text-gray-100'>
                      Silk Scarf
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      $89
                    </p>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className='absolute inset-0 -z-10'>
                <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-float'></div>
                <div className='absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 animate-float delay-1000'></div>
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div className='mt-16 text-center'>
            <div className='inline-flex items-center space-x-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-8 py-4 shadow-lg'>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                  Free Shipping
                </span>
              </div>
              <div className='w-px h-4 bg-gray-300 dark:bg-gray-600'></div>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                  30-Day Returns
                </span>
              </div>
              <div className='w-px h-4 bg-gray-300 dark:bg-gray-600'></div>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                  Premium Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroSection)
