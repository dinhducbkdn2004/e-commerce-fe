import { Link } from 'react-router-dom'

export default function CategorySection() {
  return (
    <section aria-labelledby='category-heading' className='pt-10'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='md:flex md:items-center md:justify-between'>
          <h2
            id='category-heading'
            className='text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100'
          >
            Shop by Category
          </h2>
          <Link
            to='/categories'
            className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 md:block'
          >
            Browse all categories<span aria-hidden='true'> →</span>
          </Link>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8'>
          {/* New Arrivals - Featured Category */}
          <div className='group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2'>
            <img
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-featured-category.jpg'
              className='h-full w-full object-cover object-center group-hover:opacity-75'
            />
            <div
              aria-hidden='true'
              className='bg-gradient-to-b from-transparent to-black opacity-50'
            ></div>
            <div className='flex items-end p-6'>
              <div>
                <h3 className='font-semibold text-white'>
                  <Link to='/new-arrivals'>
                    <span className='absolute inset-0'></span>
                    New Arrivals
                  </Link>
                </h3>
                <p aria-hidden='true' className='mt-1 text-sm text-white'>
                  Shop now
                </p>
              </div>
            </div>
          </div>

          {/* Accessories */}
          <div className='group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
            <img
              alt='Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.'
              src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg'
              className='h-full w-full object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0'
            />
            <div
              aria-hidden='true'
              className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
            ></div>
            <div className='flex items-end p-6 sm:absolute sm:inset-0'>
              <div>
                <h3 className='font-semibold text-white'>
                  <Link to='/accessories'>
                    <span className='absolute inset-0'></span>
                    Accessories
                  </Link>
                </h3>
                <p aria-hidden='true' className='mt-1 text-sm text-white'>
                  Shop now
                </p>
              </div>
            </div>
          </div>

          {/* Workspace */}
          <div className='group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
            <img
              alt='Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk.'
              src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg'
              className='h-full w-full object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0'
            />
            <div
              aria-hidden='true'
              className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
            ></div>
            <div className='flex items-end p-6 sm:absolute sm:inset-0'>
              <div>
                <h3 className='font-semibold text-white'>
                  <Link to='/workspace'>
                    <span className='absolute inset-0'></span>
                    Workspace
                  </Link>
                </h3>
                <p aria-hidden='true' className='mt-1 text-sm text-white'>
                  Shop now
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Browse All Link */}
        <div className='mt-6 md:hidden'>
          <Link
            to='/categories'
            className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
          >
            Browse all categories<span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
