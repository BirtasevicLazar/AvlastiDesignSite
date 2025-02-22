import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import personalizedShirt1 from '../assets/images/Majica.jpg';
import personalizedShirt2 from '../assets/images/Majica2.jpg';
import personalizedShirt3 from '../assets/images/Majica.jpg';

// Custom CSS za Swiper
const swiperCustomStyles = `
    .swiper-pagination-bullet {
        background: #C72C41;
    }

    .swiper-pagination-bullet-active {
        background: #C72C41;
    }
`;

const PersonalizedShirt = () => {
  const shirts = [
    { id: 1, image: personalizedShirt1, alt: "Personalizovana Majica 1" },
    { id: 2, image: personalizedShirt2, alt: "Personalizovana Majica 2" },
    { id: 3, image: personalizedShirt3, alt: "Personalizovana Majica 3" }, 
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 text-center">
            Personalizovana Majica
          </h2>
          <div className="w-20 h-1 bg-[#C72C41] rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 text-center max-w-2xl">
            Napravite jedinstvenu majicu koja će ispričati vašu priču. Svaki dizajn je poseban, baš kao i vaše uspomene.
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-start lg:items-center">
          <div className="order-2 lg:order-2 space-y-6 mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Napravite Vašu Personalizovanu Majicu
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Želite li posebnu majicu sa Vašim omiljenim trenucima? 
              <span className="block mt-2">
                Napravite jedinstvenu majicu sa Vašim fotografijama!
              </span>
            </p>
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                Kako do svoje majice:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-500">
                <li>Pošaljite nam Vaše omiljene slike na Instagram</li>
                <li>Mi ćemo ih uklopiti u ovaj moderni dizajn</li>
                <li>Dobićete preview pre štampe</li>
              </ol>
            </div>
            <div className="pt-4">
              <a
                href="https://instagram.com/avlasti.design"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 sm:py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                Kontaktirajte Nas na Instagramu
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-1 mb-8 lg:mb-0 w-full">
            <style>{swiperCustomStyles}</style>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true
                }}
                modules={[Autoplay, Pagination]}
                className="w-full"
              >
                {shirts.map((shirt) => (
                  <SwiperSlide key={shirt.id}>
                    <div className="relative">
                      <img
                        src={shirt.image}
                        alt={shirt.alt}
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Zašto izabrati nas?</h3>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-6">
            Naše majice su napravljene od visokokvalitetnih materijala, dostupne u raznim veličinama i dizajnima. Uverite se da će vaša personalizovana majica biti jedinstvena i nezaboravna.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default PersonalizedShirt; 