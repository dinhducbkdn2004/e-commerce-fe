import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ArrowRight,
  Award,
  Heart,
  Leaf,
  RefreshCw,
  Shield,
  Truck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FeatureSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  const sustainableImages = [
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Sustainable luxury manufacturing',
    },
    {
      url: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Eco-friendly materials',
    },
    {
      url: 'https://images.unsplash.com/photo-1605365070248-299a182a2ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Sustainable packaging',
    },
  ]

  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description:
        'Every product is crafted with the finest materials and attention to detail',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary shipping on all orders over $100 worldwide',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: RefreshCw,
      title: '30-Day Returns',
      description: 'Easy returns and exchanges within 30 days of purchase',
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: Heart,
      title: 'Wishlist & Save',
      description: 'Save your favorite items and get notified of price drops',
      color: 'text-red-600 dark:text-red-400',
    },
    {
      icon: Award,
      title: 'Authenticity Guaranteed',
      description:
        '100% authentic luxury items with certificate of authenticity',
      color: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Dedicated customer service team available around the clock',
      color: 'text-indigo-600 dark:text-indigo-400',
    },
  ]

  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-brand-primary'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Feature Hero with Carousel */}
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 mb-20'>
          {/* Background Image Carousel */}
          <div className='absolute inset-0 overflow-hidden' ref={emblaRef}>
            <div className='flex h-full'>
              {sustainableImages.map((image, index) => (
                <div
                  key={index}
                  className='flex-[0_0_100%] h-full relative min-w-0'
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className='h-full w-full object-cover opacity-30 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-gray-900/80 to-purple-900/80'></div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className='relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24'>
            <div className='mx-auto max-w-4xl text-center'>
              <div className='flex items-center justify-center mb-6 animate-fade-in'>
                <div className='bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
                  <div className='flex items-center space-x-2'>
                    <Leaf className='w-5 h-5 text-green-400' />
                    <span className='text-green-400 font-medium text-sm uppercase tracking-wider'>
                      Sustainable Luxury
                    </span>
                  </div>
                </div>
              </div>

              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight'>
                Crafted for Tomorrow,
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mt-2'>
                  Designed for Today
                </span>
              </h2>

              <p className='text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed'>
                We're committed to responsible, sustainable, and ethical
                manufacturing. Our small-scale approach allows us to focus on
                quality while reducing our environmental impact.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <Link to='/sustainability'>
                  <Button
                    size='lg'
                    className='bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white px-8 py-4 rounded-full font-semibold transition-all duration-300 group'
                  >
                    Our Sustainability Story
                    <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
                <Link to='/about'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto'
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className='text-center mb-16'>
          <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Why Choose BeeLuxe?
          </h3>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Experience luxury shopping with unparalleled service and quality
            that exceeds expectations.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
            >
              <CardContent className='p-8 text-center'>
                <div className='mb-6'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 group-hover:scale-110 transition-transform duration-300'>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>

                <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                  {feature.title}
                </h4>

                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats Section */}
        <div className='mt-20 pt-12 border-t border-purple-200 dark:border-purple-700'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div className='space-y-2'>
              <div className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
                500K+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                Happy Customers
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
                99.8%
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                Satisfaction Rate
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
                180+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                Countries Shipped
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
                15+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
