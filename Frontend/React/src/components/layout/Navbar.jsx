import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import logo from '../../assets/images/logo.png'

const navigation = [
  { name: 'Početna', href: '/' },
  { name: 'Proizvodi', href: '/products' },
  { name: 'O nama', href: '/about' },
  { name: 'Kontakt', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const { cart } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  const shouldUseDarkColors = !isHomePage || isScrolled

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          shouldUseDarkColors ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link 
              to="/" 
              className="flex items-center"
            >
              <img 
                src={logo} 
                alt="AvlastiDesign Logo" 
                className={`h-6 w-auto transition-all duration-300 ease-in-out ${
                  shouldUseDarkColors
                    ? 'opacity-100 brightness-0' 
                    : 'opacity-90 hover:opacity-100 brightness-0 invert'
                }`}
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm tracking-wide transition-all duration-300 ${
                    shouldUseDarkColors
                      ? location.pathname === item.href
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                      : location.pathname === item.href
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/cart"
                className={`relative transition-colors duration-300 ${
                  shouldUseDarkColors
                    ? 'text-gray-500 hover:text-gray-900'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <ShoppingBagIcon className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden w-8 h-8 flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
                shouldUseDarkColors ? 'text-gray-900' : 'text-white'
              }`}
            >
              <span 
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out ${
                  shouldUseDarkColors ? 'bg-gray-900' : 'bg-white'
                } ${
                  isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                }`}
              />
              <span 
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out ${
                  shouldUseDarkColors ? 'bg-gray-900' : 'bg-white'
                } ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out ${
                  shouldUseDarkColors ? 'bg-gray-900' : 'bg-white'
                } ${
                  isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-xl"
            >
              <div className="h-20 px-6 flex items-center justify-between">
                <img 
                  src={logo} 
                  alt="AvlastiDesign Logo" 
                  className="h-5 w-auto brightness-0"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6">
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={item.href}
                        className={`block text-base transition-colors ${
                          location.pathname === item.href
                            ? 'text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="mt-8"
                >
                  <Link
                    to="/cart"
                    className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingBagIcon className="h-5 w-5" />
                    <span className="text-sm">Korpa</span>
                    {cart.length > 0 && (
                      <span className="bg-white text-gray-900 text-xs font-medium px-1.5 py-0.5 rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="mt-8 pt-8 border-t border-gray-100"
                >
                  <div className="flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                      Facebook
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}