import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroVideo from '../../assets/images/hero-video.mp4'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const slideIn = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
}

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video pozadina */}
      <motion.video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </motion.video>

      {/* Glavni sadržaj */}
      <div className="relative z-20 h-full container mx-auto px-4">
        {/* Gornji deo sa naslovom za veće ekrane */}
        <div className="hidden md:block pt-32 md:pt-40 lg:pt-48 max-w-4xl">
          <motion.div 
            variants={slideIn}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C72C41] to-[#C72C41]">
                Nova
              </span>
              <br />
              <span className="relative inline-block">
                Kolekcija
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-[#C72C41]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </span>
            </h1>

            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="animate-pulse w-2 h-2 bg-[#C72C41] rounded-full"/>
                <span className="text-white text-sm font-medium">2025</span>
                <span className="text-white/80 text-sm ml-2">Ekskluzivni dizajn</span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Gornji deo sa naslovom za manje ekrane */}
        <div className="block md:hidden pt-20 max-w-4xl">
          <motion.div 
            variants={slideIn}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-white leading-tight">
              <span className="relative inline-block">
                Nova Kolekcija
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-[#C72C41]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </span>
            </h1>

            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="animate-pulse w-1.5 h-1.5 bg-[#C72C41] rounded-full"/>
                <span className="text-white text-xs font-medium">2025</span>
                <span className="text-white/80 text-xs ml-1">Ekskluzivni dizajn</span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Desna strana - novi sadržaj (vidljiv samo na većim ekranima) */}
        <div className="hidden md:block absolute top-50 right-4 lg:right-8 z-30 w-[300px] lg:w-[380px]">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 lg:space-y-6"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-4 -right-2 bg-gradient-to-r from-[#C72C41] to-[#C72C41] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg transform rotate-2 z-40"
            >
              Premium 2025
            </motion.div>

            {/* Glavni info box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 lg:p-6 border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C72C41]/10 rounded-full blur-2xl"></div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C72C41] to-[#C72C41] flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg lg:text-xl">Premium Kvalitet</h3>
                  <p className="text-white/70 text-sm">Ručno izrađeno sa pažnjom prema detaljima</p>
                </div>
              </div>
            </div>

            {/* Statistike */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 relative group hover:bg-white/15 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C72C41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">100+</div>
                  <div className="text-white/70 text-sm">Jedinstvenih Dizajna</div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 relative group hover:bg-white/15 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C72C41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-white/70 text-sm">Korisnička Podrška</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dugmad na dnu */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-15">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 flex flex-col items-center gap-6"
        >
          {/* Novi opis iznad dugmadi */}
          <motion.p 
            variants={fadeInUp}
            className="text-white text-center text-lg md:text-xl max-w-2xl backdrop-blur-sm bg-black/10 rounded-lg px-4 py-2"
          >
            Otkrijte našu novu kolekciju!
          </motion.p>

          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center bg-[#C72C41] text-white px-6 py-3 text-sm font-medium rounded-full hover:bg-[#C72C41]/80 transition-all duration-200"
            >
              Istraži kolekciju
              <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              to="/about"
              className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white border border-[#C72C41]/30 rounded-full hover:bg-[#C72C41]/10 transition-all duration-200 backdrop-blur-sm"
            >
              Saznaj više
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}