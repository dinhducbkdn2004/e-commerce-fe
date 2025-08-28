import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

function CategorySection() {
  const categories = [
    {
      id: 'bags',
      name: 'Luxury Bags',
      description: 'Handcrafted leather essentials',
      href: '/shop/bags',
      image:
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      featured: true,
      badge: 'Bestseller',
    },
    {
      id: 'clothing',
      name: 'Designer Clothing',
      description: 'Premium fashion pieces',
      href: '/shop/clothing',
      image:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=2005&q=80',
      featured: false,
    },
    {
      id: 'jewelry',
      name: 'Fine Jewelry',
      description: 'Elegant accessories',
      href: '/shop/jewelry',
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      featured: false,
    },
    {
      id: 'watches',
      name: 'Luxury Watches',
      description: 'Timeless precision',
      href: '/shop/watches',
      image:
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2060&q=80',
      featured: false,
    },
    {
      id: 'shoes',
      name: 'Designer Shoes',
      description: 'Step in style',
      href: '/shop/shoes',
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80',
      featured: false,
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Complete your look',
      href: '/shop/accessories',
      image:
        'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      featured: false,
    },
  ]

  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-indigo-900/10'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 lg:mb-16'>
          <div className='flex items-center justify-center mb-4'>
            <Sparkles className='w-6 h-6 text-purple-600 dark:text-purple-400 mr-2' />
            <span className='text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider'>
              Collections
            </span>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            Shop by
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 ml-3'>
              Category
            </span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Discover our carefully curated collections, each piece selected for
            its exceptional quality and timeless appeal.
          </p>
        </div>

        {/* Balanced Categories Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12'>
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.href}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                category.featured ? 'sm:col-span-2 lg:col-span-2' : ''
              } ${index === 0 ? 'sm:row-span-2' : ''}`}
            >
              {/* Consistent height container */}
              <div
                className={`relative overflow-hidden ${
                  category.featured
                    ? 'h-80 sm:h-96 lg:h-[500px]'
                    : 'h-80 sm:h-72 lg:h-60'
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500'></div>

                {/* Badge */}
                {category.badge && (
                  <div className='absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg'>
                    {category.badge}
                  </div>
                )}

                {/* Content */}
                <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6'>
                  <h3
                    className={`font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300 line-clamp-2 ${
                      category.featured
                        ? 'text-xl sm:text-2xl lg:text-3xl'
                        : 'text-lg sm:text-xl'
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`text-gray-200 mb-4 opacity-90 line-clamp-2 ${
                      category.featured ? 'text-base sm:text-lg' : 'text-sm'
                    }`}
                  >
                    {category.description}
                  </p>
                  <div className='flex items-center text-white font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out'>
                    <span className='text-purple-200 text-sm'>Shop Now</span>
                    <ArrowRight className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300' />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className='absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/10 transition-colors duration-500'></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className='text-center'>
          <div className='inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 lg:p-10 border border-purple-200 dark:border-purple-800'>
            <div className='text-center sm:text-left'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                Can't find what you're looking for?
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-sm'>
                Browse our complete collection of premium products
              </p>
            </div>
            <Link to='/shop/all'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group whitespace-nowrap'
              >
                View All Products
                <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-purple-200 dark:border-purple-700'>
          <div className='text-center'>
            <div className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              500+
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Premium Products
            </div>
          </div>
          <div className='text-center'>
            <div className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              50+
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Luxury Brands
            </div>
          </div>
          <div className='text-center'>
            <div className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              24/7
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Customer Support
            </div>
          </div>
          <div className='text-center'>
            <div className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              100%
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Satisfaction Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(CategorySection)
