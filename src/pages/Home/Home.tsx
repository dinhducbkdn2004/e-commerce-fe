export default function Home() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Hero Section */}
      <section className='flex flex-col items-center justify-center py-16'>
        <div className='text-center space-y-6 max-w-2xl'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>
            Welcome to our Store
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Explore our wide range of products with beautiful dark/light theme
            support!
          </p>

          {/* Demo cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12'>
            <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                🛍️ Products
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Browse our carefully curated collection of high-quality
                products.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                🎨 Dark Mode
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Enjoy a beautiful shopping experience in both light and dark
                themes.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                🚀 Fast Performance
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Built with modern technologies for lightning-fast performance.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                🔒 Secure
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Your data and transactions are protected with enterprise-grade
                security.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className='mt-12 space-y-4'>
            <button className='bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-medium'>
              Start Shopping
            </button>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Join thousands of satisfied customers
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            Why Choose Us?
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            We provide the best shopping experience with modern technology and
            excellent customer service.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center'>
            <div className='bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
              <span className='text-2xl'>📦</span>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Free Shipping
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Free shipping on all orders over $50
            </p>
          </div>

          <div className='text-center'>
            <div className='bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
              <span className='text-2xl'>💝</span>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Easy Returns
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              30-day return policy on all items
            </p>
          </div>

          <div className='text-center'>
            <div className='bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
              <span className='text-2xl'>🎧</span>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              24/7 Support
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Get help whenever you need it
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
