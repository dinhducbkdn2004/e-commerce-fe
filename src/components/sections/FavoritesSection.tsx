import { Link } from 'react-router-dom'

export default function FavoritesSection() {
  return (
    <section aria-labelledby='favorites-heading'>
      <div className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
        <div className='md:flex md:items-center md:justify-between'>
          <h2
            id='favorites-heading'
            className='text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100'
          >
            Our Favorites
          </h2>
          <Link
            to='/favorites'
            className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 md:block'
          >
            Browse all favorites<span aria-hidden='true'> →</span>
          </Link>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
          <div className='group relative'>
            <img
              alt="Model wearing women's black cotton crewneck tee."
              src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-01.jpg'
              className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-135'
            />
            <h3 className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
              <Link to='/product/black-basic-tee'>
                <span className='absolute inset-0'></span>
                Black Basic Tee
              </Link>
            </h3>
            <p className='mt-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
              $32
            </p>
          </div>
          <div className='group relative'>
            <img
              alt="Model wearing women's off-white cotton crewneck tee."
              src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-02.jpg'
              className='aspect-square rounded-md w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-135'
            />
            <h3 className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
              <Link to='/product/off-white-basic-tee'>
                <span className='absolute inset-0'></span>
                Off-White Basic Tee
              </Link>
            </h3>
            <p className='mt-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
              $32
            </p>
          </div>
          <div className='group relative'>
            <img
              alt="Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle."
              src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-03.jpg'
              className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-135'
            />
            <h3 className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
              <Link to='/product/mountains-artwork-tee'>
                <span className='absolute inset-0'></span>
                Mountains Artwork Tee
              </Link>
            </h3>
            <p className='mt-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
              $36
            </p>
          </div>
        </div>
        <div className='mt-6 md:hidden'>
          <Link
            to='/favorites'
            className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
          >
            Browse all favorites<span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
