export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
      author: 'Sarah Peters',
      location: 'New Orleans',
    },
    {
      quote:
        "I had to return a purchase that didn't fit. The whole process was so simple that I ended up ordering two new items!",
      author: 'Kelly McPherson',
      location: 'Chicago',
    },
    {
      quote:
        "Now that I'm on holiday for the summer, I'll probably order a few more shirts. It's just so convenient, and I know the quality will always be there.",
      author: 'Chris Paul',
      location: 'Phoenix',
    },
  ]

  return (
    <section
      aria-labelledby='testimonial-heading'
      className='relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-16 lg:px-8'
    >
      <div className='max-w-2xl mx-auto lg:max-w-none'>
        <h2
          id='testimonial-heading'
          className='text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100'
        >
          What are people saying?
        </h2>
        <div className='mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8'>
          {testimonials.map((testimonial, index) => (
            <blockquote key={index} className='sm:flex lg:block'>
              <svg
                width='24'
                height='18'
                viewBox='0 0 24 18'
                aria-hidden='true'
                className='flex-shrink-0 text-gray-300 dark:text-gray-500'
              >
                <path
                  d='M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z'
                  fill='currentColor'
                />
              </svg>
              <div className='mt-6 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0 border-l border-gray-200 dark:border-gray-700 pl-6'>
                <p className='text-lg text-gray-600 dark:text-gray-400'>
                  {testimonial.quote}
                </p>
                <cite className='mt-4 block font-semibold not-italic text-gray-900 dark:text-gray-100'>
                  {testimonial.author}, {testimonial.location}
                </cite>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
