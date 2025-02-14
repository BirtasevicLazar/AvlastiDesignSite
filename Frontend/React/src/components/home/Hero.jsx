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

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        const response = await axiosInstance.get('/api/hero-settings');
        setHeroSettings(response.data);
      } catch (error) {
        console.error('Error fetching hero settings:', error);
      }
    };

    fetchHeroSettings();
  }, []);

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
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500">
                    za tvoj stil života
                  </span>
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
          transition={{ delay: 1 }}
          className="absolute top-1/2 -translate-y-1/2 right-8 z-20 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl max-w-[240px] hidden xl:block"
        >
          <div className="flex flex-col gap-3">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img 
                src={heroSettings?.bestseller_image || bestselerMajica}
                alt="Bestseler majica"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Bestseler majica</h3>
              <p className="text-sm text-white/70">Dostupno u više boja</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-medium text-white">2.499 RSD</span>
                <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
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