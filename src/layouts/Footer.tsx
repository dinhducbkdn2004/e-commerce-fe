import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Bags & Purses', href: '/shop/bags' },
        { name: 'Clothing', href: '/shop/clothing' },
        { name: 'Accessories', href: '/shop/accessories' },
        { name: 'Jewelry', href: '/shop/jewelry' },
        { name: 'Sale Items', href: '/sale' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns & Exchanges', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Track Your Order', href: '/track-order' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Our Story', href: '/story' },
        { name: 'Blog', href: '/blog' },
      ],
    },
  ]

  const contactInfo = [
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: Mail, text: 'hello@beeluxe.com', href: 'mailto:hello@beeluxe.com' },
    { icon: MapPin, text: '123 Fashion Ave, NYC 10001', href: '#' },
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/beeluxe', label: 'Facebook' },
    {
      icon: Instagram,
      href: 'https://instagram.com/beeluxe',
      label: 'Instagram',
    },
    { icon: Twitter, href: 'https://twitter.com/beeluxe', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/beeluxe', label: 'YouTube' },
  ]

  return (
    <footer className='bg-brand-primary border-t border-purple-200 dark:border-purple-800'>
      <div className='container mx-auto px-4 py-12 lg:py-16'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            {/* Logo */}
            <Link to='/' className='flex items-center space-x-2 group mb-6'>
              <div className='relative'>
                <div className='w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 transform rotate-45 rounded-sm group-hover:scale-110 transition-transform duration-300'></div>
                <div className='absolute inset-1 bg-white dark:bg-gray-900 transform rotate-45 rounded-sm'></div>
              </div>
              <span className='text-2xl font-light tracking-wider text-gray-900 dark:text-white'>
                Bee
                <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
                  Luxe
                </span>
              </span>
            </Link>

            <p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed'>
              Discover luxury fashion and accessories crafted with passion. Your
              style journey begins here with premium quality and timeless
              elegance.
            </p>

            {/* Contact Information */}
            <div className='space-y-3 mb-6'>
              {contactInfo.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className='flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group'
                >
                  <item.icon className='h-4 w-4 group-hover:scale-110 transition-transform' />
                  <span className='text-sm'>{item.text}</span>
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className='flex space-x-4'>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 border border-purple-100 dark:border-purple-800'
                  aria-label={social.label}
                >
                  <social.icon className='h-5 w-5' />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className='text-gray-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider'>
                {section.title}
              </h3>
              <ul className='space-y-3'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className='text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group'
                    >
                      <span>{link.name}</span>
                      <ArrowRight className='h-3 w-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200' />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className='mt-12 pt-8 border-t border-purple-200 dark:border-purple-800'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            <div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                Stay in the Loop
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                Be the first to know about new collections, exclusive offers,
                and style tips. Join our newsletter for 10% off your first
                order.
              </p>
            </div>
            <div>
              <form className='flex flex-col sm:flex-row gap-3'>
                <Input
                  type='email'
                  placeholder='Enter your email address'
                  className='flex-1 bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400'
                  required
                />
                <Button
                  type='submit'
                  className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 whitespace-nowrap border-0'
                >
                  Subscribe
                  <ArrowRight className='h-4 w-4 ml-2' />
                </Button>
              </form>
              <p className='text-xs text-gray-500 dark:text-gray-500 mt-2'>
                By subscribing, you agree to our{' '}
                <Link
                  to='/privacy'
                  className='underline hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  to='/terms'
                  className='underline hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                >
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 pt-8 border-t border-purple-200 dark:border-purple-800'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
              <p>© {currentYear} BeeLuxe. All rights reserved.</p>
            </div>

            <div className='flex flex-wrap items-center gap-6 text-sm'>
              <Link
                to='/terms'
                className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                to='/privacy'
                className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                to='/cookies'
                className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors'
              >
                Cookie Policy
              </Link>
              <Link
                to='/accessibility'
                className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors'
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods & Security */}
        <div className='mt-8 pt-6 border-t border-purple-200 dark:border-purple-800'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
              <span>Secure payments powered by</span>
              <div className='flex items-center gap-2 ml-2'>
                <div className='px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded text-xs font-medium'>
                  Stripe
                </div>
                <div className='px-2 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded text-xs font-medium'>
                  PayPal
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
              <span>SSL secured</span>
              <span>•</span>
              <span>Free shipping over $100</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
