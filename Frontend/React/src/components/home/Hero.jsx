import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import bestselerMajica from '../../assets/images/Majica.jpg'
import heroImage from '../../assets/images/hero.png'
import axiosInstance from '../../utils/axios'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Hero() {
  const [heroSettings, setHeroSettings] = useState(null);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        const response = await axiosInstance.get('/api/hero-settings');
        setHeroSettings(response.data);
        if (response.data.featured_product) {
          setFeaturedProduct(response.data.featured_product);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hero settings:', error);
        setLoading(false);
      }
    };

    fetchHeroSettings();
  }, []);

  if (loading) {
    return (
      <div className="relative bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
                <div className="h-12 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-full w-full bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (!featuredProduct) {
    return null;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Pozadinska slika sa overlay-em */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent z-10" />
        <img
          src={heroImage}
          alt="Hero background"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Glavni sadržaj */}
      <div className="relative z-20 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-screen pt-16 pb-16">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div 
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  <span className="text-sm font-medium text-white">Nova kolekcija 2024</span>
                </span>
              </motion.div>

              {/* Glavni naslov */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                className="relative mb-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  <span className="block mb-2">Unikatne majice</span>
                  <span className="block text-teal-400">za tvoj stil života</span>
                </h1>
              </motion.div>

              {/* Opis */}
              <motion.p
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-white/80 mb-8 max-w-2xl"
              >
                Svaka majica je ručno izrađena sa pažnjom prema detaljima, spajajući udobnost i autentičan dizajn.
              </motion.p>

              {/* CTA Dugmad */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/products"
                  className="group relative inline-flex items-center justify-center bg-teal-500 text-white px-6 py-3 text-sm font-medium rounded-full hover:bg-teal-600 transition-all duration-200"
                >
                  Istraži kolekciju
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  to="/about"
                  className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                >
                  Saznaj više
                </Link>
              </motion.div>

              {/* Statistika */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.8 }}
                className="mt-12 grid grid-cols-3 gap-4 sm:gap-8"
              >
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
                  <p className="mt-1 text-xs sm:text-sm text-white/70">Kupaca</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">50+</p>
                  <p className="mt-1 text-xs sm:text-sm text-white/70">Unikatnih dizajna</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">100%</p>
                  <p className="mt-1 text-xs sm:text-sm text-white/70">Organski pamuk</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating product card */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-1/2 -translate-y-1/2 right-8 z-20 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl max-w-[240px] hidden xl:block hover:bg-white/20 transition-all duration-300"
        >
          <Link to={`/products/${featuredProduct.id}`} className="block">
            <div className="flex flex-col gap-3">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={`${import.meta.env.VITE_API_URL}/storage/${featuredProduct.image}`}
                  alt={featuredProduct.name}
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="text-base font-semibold text-white">Bestseler majica</h3>
                <p className="text-sm text-white/70 mb-2">Dostupno u više boja</p>
                <span className="text-lg font-medium text-white">{featuredProduct.price} RSD</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Scroll indikator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm font-medium mb-2">Otkrij više</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 