import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Quote, Star, Users } from 'lucide-react'
import { useCallback } from 'react'

export default function TestimonialSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const testimonials = [
    {
      quote:
        'The quality exceeded my expectations! My order arrived super quickly and the packaging was beautiful. Very happy customer over here!',
      author: 'Sarah Peters',
      location: 'New York, NY',
      rating: 5,
      verified: true,
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        "I had to return a purchase that didn't fit. The whole process was so simple that I ended up ordering two new items! Exceptional customer service.",
      author: 'Kelly McPherson',
      location: 'Chicago, IL',
      rating: 5,
      verified: true,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        "Now that I'm on holiday for the summer, I'll probably order a few more items. It's just so convenient, and I know the quality will always be there.",
      author: 'Chris Paul',
      location: 'Phoenix, AZ',
      rating: 5,
      verified: true,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        "Absolutely love the quality and attention to detail. Every piece I've purchased has become a staple in my wardrobe.",
      author: 'Emma Wilson',
      location: 'Los Angeles, CA',
      rating: 5,
      verified: true,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        "Fast shipping, beautiful packaging, and products that exceed expectations. I'm a customer for life!",
      author: 'Michael Chen',
      location: 'San Francisco, CA',
      rating: 5,
      verified: true,
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        'The personal styling service helped me find pieces that truly reflect my personality. Outstanding experience!',
      author: 'Jessica Davis',
      location: 'Miami, FL',
      rating: 5,
      verified: true,
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
  ]

  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 lg:mb-16'>
          <div className='flex items-center justify-center mb-4'>
            <Users className='w-6 h-6 text-purple-600 dark:text-purple-400 mr-2' />
            <span className='text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider'>
              Customer Reviews
            </span>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            What Our Customers
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 block sm:inline sm:ml-3'>
              Are Saying
            </span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Real feedback from real customers who love shopping with us. Join
            thousands of satisfied customers worldwide.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className='relative mb-12'>
          {/* Navigation Buttons */}
          <div className='flex justify-center gap-4 mb-8'>
            <Button
              variant='outline'
              size='sm'
              onClick={scrollPrev}
              className='rounded-full w-10 h-10 p-0 border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-500 dark:hover:bg-purple-900/20'
            >
              <ChevronLeft className='w-4 h-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={scrollNext}
              className='rounded-full w-10 h-10 p-0 border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-500 dark:hover:bg-purple-900/20'
            >
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>

          {/* Carousel Container */}
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className='flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3'
                >
                  <Card className='group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden h-full'>
                    <CardContent className='p-8'>
                      {/* Quote Icon */}
                      <div className='flex items-center justify-between mb-6'>
                        <Quote className='w-8 h-8 text-purple-600 dark:text-purple-400' />
                        {testimonial.verified && (
                          <Badge
                            variant='outline'
                            className='border-green-500 text-green-600 dark:text-green-400'
                          >
                            Verified Purchase
                          </Badge>
                        )}
                      </div>

                      {/* Rating */}
                      <div className='flex items-center mb-4'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm'>
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className='flex items-center'>
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className='w-12 h-12 rounded-full mr-4 object-cover'
                        />
                        <div>
                          <div className='font-semibold text-gray-900 dark:text-white text-sm'>
                            {testimonial.author}
                          </div>
                          <div className='text-gray-500 dark:text-gray-400 text-xs'>
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 text-center'>
          <div className='space-y-2'>
            <div className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
              4.9
            </div>
            <div className='flex items-center justify-center mb-2'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className='h-5 w-5 text-yellow-400 fill-current'
                />
              ))}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Average Rating
            </div>
          </div>
          <div className='space-y-2'>
            <div className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
              50K+
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Happy Customers
            </div>
          </div>
          <div className='space-y-2'>
            <div className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
              99%
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
