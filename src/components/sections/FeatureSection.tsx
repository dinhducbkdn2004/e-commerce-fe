import { Link } from 'react-router-dom'

export default function FeatureSection() {
  return (
    <section aria-labelledby='cause-heading'>
      <div className='relative overflow-hidden bg-gray-900 py-32 px-6 sm:py-40 sm:px-12 lg:px-16'>
        <div className='absolute inset-0 bg-gray-900 mix-blend-multiply' />
        <div className='absolute inset-0'>
          <img
            alt='Sustainable manufacturing process'
            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-feature-section-full-width.jpg'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-gray-900 opacity-50'
        />
        <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
          <h2
            id='cause-heading'
            className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
          >
            Long-term thinking
          </h2>
          <p className='mt-3 text-xl text-white'>
            We're committed to responsible, sustainable, and ethical
            manufacturing. Our small-scale approach allows us to focus on
            quality and reduce our impact. We're doing our best to delay the
            inevitable heat-death of the universe.
          </p>
          <Link
            to='/story'
            className='mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
          >
            Read our story
          </Link>
        </div>
      </div>
    </section>
  )
}
