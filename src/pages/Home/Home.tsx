import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className=' mx-auto px-4 '>
      {/* Hero Section */}
      <div className='relative overflow-hidden '>
        <div className='pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40'>
          <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
            <div className='sm:max-w-lg'>
              <h1 className='text-4xl font-bold tracking-tight  sm:text-6xl'>
                Summer styles are finally here
              </h1>
              <p className='mt-4 text-xl '>
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className='mt-10'>
                {/* Image Gallery */}
                <div
                  aria-hidden='true'
                  className='pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
                >
                  <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                    <div className='flex items-center space-x-6 lg:space-x-8'>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                          <img
                            alt='Fashion item 1'
                            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg'
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt='Fashion item 2'
                            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg'
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt='Fashion item 3'
                            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg'
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt='Fashion item 4'
                            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg'
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt='Fashion item 5'
                            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg'
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt='Fashion item 6'
                            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg'
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt='Fashion item 7'
                            src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg'
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to='/collection'
                  className='inline-block outline rounded-md border border-transparent  px-8 py-3 text-center font-medium  transition-colors'
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category Section */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
              Shop by Category
            </h2>
            <Link
              to='/categories'
              className='hidden text-sm font-semibold  sm:block'
            >
              Browse all categories
              <span aria-hidden='true'> →</span>
            </Link>
          </div>

          <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
            {/* New Arrivals - Large featured category */}
            <div className='group relative lg:col-span-2'>
              <div className='relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
                <img
                  alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                  src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-featured-category.jpg'
                  className='h-full w-full object-cover object-center '
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
              </div>
              <div className='absolute inset-0 flex items-end p-6'>
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    <Link to='/new-arrivals'>
                      <span className='absolute inset-0'></span>
                      New Arrivals
                    </Link>
                  </h3>
                  <p className='mt-1 text-sm text-white'>Shop now</p>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              {/* Accessories */}
              <div className='group relative'>
                <div className='relative h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-2 lg:aspect-w-1 group-hover:opacity-75'>
                  <img
                    alt='Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.'
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                </div>
                <div className='absolute inset-0 flex items-end p-6'>
                  <div>
                    <h3 className='text-lg font-semibold text-white'>
                      <Link to='/accessories'>
                        <span className='absolute inset-0'></span>
                        Accessories
                      </Link>
                    </h3>
                    <p className='mt-1 text-sm text-white'>Shop now</p>
                  </div>
                </div>
              </div>

              {/* Workspace */}
              <div className='group relative'>
                <div className='relative h-32 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-2 lg:aspect-w-1 group-hover:opacity-75'>
                  <img
                    alt='Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk.'
                    src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg'
                    className='h-full w-full object-cover object-center'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                </div>
                <div className='absolute inset-0 flex items-end p-6'>
                  <div>
                    <h3 className='text-lg font-semibold text-white'>
                      <Link to='/workspace'>
                        <span className='absolute inset-0'></span>
                        Workspace
                      </Link>
                    </h3>
                    <p className='mt-1 text-sm text-white'>Shop now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Browse All Link */}
          <div className='mt-6 sm:hidden'>
            <Link
              to='/categories'
              className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Browse all categories
              <span aria-hidden='true'> →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Long-term thinking Section */}
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

      {/* Our Favorites Section */}
      <section aria-labelledby='favorites-heading'>
        <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
          <div className='sm:flex sm:items-baseline sm:justify-between'>
            <h2
              id='favorites-heading'
              className='text-2xl font-bold tracking-tight text-gray-900'
            >
              Our Favorites
            </h2>
            <Link
              to='/favorites'
              className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
            >
              Browse all favorites
              <span aria-hidden='true'> →</span>
            </Link>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-8'>
            <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2'>
              <img
                alt="Model wearing women's black cotton crewneck tee."
                src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-01.jpg'
                className='h-full w-full object-cover object-center group-hover:opacity-75'
              />
              <div
                aria-hidden='true'
                className='bg-gradient-to-b from-transparent to-black opacity-50'
              />
              <div className='flex items-end p-6'>
                <div>
                  <h3 className='font-semibold text-white'>
                    <Link to='/product/black-basic-tee'>
                      <span className='absolute inset-0' />
                      Black Basic Tee
                    </Link>
                  </h3>
                  <p className='mt-1 text-sm text-white'>$32</p>
                </div>
              </div>
            </div>
            <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
              <img
                alt="Model wearing women's off-white cotton crewneck tee."
                src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-02.jpg'
                className='h-full w-full object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0'
              />
              <div
                aria-hidden='true'
                className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
              />
              <div className='flex items-end p-6 sm:absolute sm:inset-0'>
                <div>
                  <h3 className='font-semibold text-white'>
                    <Link to='/product/off-white-basic-tee'>
                      <span className='absolute inset-0' />
                      Off-White Basic Tee
                    </Link>
                  </h3>
                  <p className='mt-1 text-sm text-white'>$32</p>
                </div>
              </div>
            </div>
            <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
              <img
                alt="Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle."
                src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-03.jpg'
                className='h-full w-full object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0'
              />
              <div
                aria-hidden='true'
                className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
              />
              <div className='flex items-end p-6 sm:absolute sm:inset-0'>
                <div>
                  <h3 className='font-semibold text-white'>
                    <Link to='/product/mountains-artwork-tee'>
                      <span className='absolute inset-0' />
                      Mountains Artwork Tee
                    </Link>
                  </h3>
                  <p className='mt-1 text-sm text-white'>$36</p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 sm:hidden'>
            <Link
              to='/favorites'
              className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Browse all favorites
              <span aria-hidden='true'> →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Stock Sale Section */}
      <section aria-labelledby='sale-heading'>
        <div className='relative overflow-hidden bg-white'>
          <div className='pb-16 pt-80 sm:pb-24 sm:pt-24 lg:pb-32 lg:pt-16'>
            <div className='relative mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8'>
              <div className='max-w-2xl text-center'>
                <h2
                  id='sale-heading'
                  className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'
                >
                  Final Stock.
                  <br />
                  Up to 50% off.
                </h2>
                <div className='mt-6'>
                  <Link
                    to='/sale'
                    className='inline-flex items-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-700'
                  >
                    Shop the sale
                    <span aria-hidden='true'> →</span>
                  </Link>
                </div>
              </div>
              <div className='absolute inset-0 overflow-hidden lg:size-full'>
                <div className='absolute left-1/2 top-0 -translate-x-1/2 transform lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                  <div className='flex items-center space-x-6 lg:space-x-8'>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt='Sale item 1'
                          src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt='Sale item 2'
                          src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt='Sale item 3'
                          src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-01.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt='Sale item 4'
                          src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-02.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt='Sale item 5'
                          src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt='Sale item 6'
                          src='https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white' aria-labelledby='footer-heading'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='border-t border-gray-200 py-20'>
            <div className='grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16'>
              {/* Sitemap sections */}
              <div className='col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1'>
                <h3 className='text-sm font-medium text-gray-900'>Shop</h3>
                <ul role='list' className='mt-6 space-y-6'>
                  <li className='text-sm'>
                    <Link
                      to='/bags'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Bags
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/tees'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Tees
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/objects'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Objects
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/home-goods'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Home Goods
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/accessories'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-3'>
                <h3 className='text-sm font-medium text-gray-900'>Company</h3>
                <ul role='list' className='mt-6 space-y-6'>
                  <li className='text-sm'>
                    <Link
                      to='/about'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Who we are
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/sustainability'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Sustainability
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/press'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Press
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/careers'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Careers
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/terms'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/privacy'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-span-1 md:col-span-2 lg:row-start-2 lg:col-start-1'>
                <h3 className='text-sm font-medium text-gray-900'>Account</h3>
                <ul role='list' className='mt-6 space-y-6'>
                  <li className='text-sm'>
                    <Link
                      to='/account'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Manage Account
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/returns'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Returns & Exchanges
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      to='/gift-card'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Redeem a Gift Card
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-span-1 md:col-span-2 lg:row-start-2 lg:col-start-3'>
                <h3 className='text-sm font-medium text-gray-900'>Connect</h3>
                <ul role='list' className='mt-6 space-y-6'>
                  <li className='text-sm'>
                    <Link
                      to='/contact'
                      className='text-gray-500 hover:text-gray-600'
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <a href='#' className='text-gray-500 hover:text-gray-600'>
                      Facebook
                    </a>
                  </li>
                  <li className='text-sm'>
                    <a href='#' className='text-gray-500 hover:text-gray-600'>
                      Instagram
                    </a>
                  </li>
                  <li className='text-sm'>
                    <a href='#' className='text-gray-500 hover:text-gray-600'>
                      Pinterest
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter signup */}
              <div className='md:col-span-8 md:col-start-3 lg:row-start-1 lg:col-span-5 lg:col-start-6'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Sign up for our newsletter
                </h3>
                <p className='mt-6 text-sm text-gray-500'>
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form className='mt-2 flex sm:max-w-md'>
                  <label htmlFor='email-address' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    type='email'
                    required
                    autoComplete='email'
                    className='w-0 flex-1 min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                    placeholder='Enter your email'
                  />
                  <div className='ml-4 flex-shrink-0'>
                    <button
                      type='submit'
                      className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-200 py-10'>
            <p className='text-sm text-gray-500'>
              Copyright © 2021 Your Company, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
