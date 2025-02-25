import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Majica1 from '../../assets/images/1.jpg';
import Majica2 from '../../assets/images/2.jpg';
import Majica3 from '../../assets/images/3.jpg';
import Majica4 from '../../assets/images/4.jpg';
import Majica5 from '../../assets/images/5.jpg';


// Custom CSS za Swiper
const swiperCustomStyles = `
    .swiper-pagination-bullet {
        background: #C72C41;
    }

    .swiper-pagination-bullet-active {
        background: #C72C41;
    }
`;

const CustomShirt = () => {
  const shirts = [
    { id: 1, image: Majica1, alt: "Custom Girlfriend Shirt Template 1" },
    { id: 2, image: Majica2, alt: "Custom Girlfriend Shirt Template 2" },
    { id: 3, image: Majica3, alt: "Custom Girlfriend Shirt Template 3" }, 
    { id: 4, image: Majica4, alt: "Custom Girlfriend Shirt Template 4" },
    { id: 5, image: Majica5, alt: "Custom Girlfriend Shirt Template 5" }, 
  ];

  return (
    <div className="bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">
            Personalizovana Majica
          </h2>
          <div className="w-20 h-1 bg-[#C72C41] rounded-full"></div>
        </motion.div>

        {/* Mobile: Stack layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-start lg:items-center">
          {/* Text content for mobile comes first */}
          <div className="order-2 lg:order-2 space-y-6 mb-8 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Napravite Vašu Personalizovanu Majicu
            </h2>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Želite li posebnu majicu sa Vašim omiljenim trenucima? 
              <span className="block mt-2">
                Napravite jedinstvenu "Girlfriend" majicu sa Vašim fotografijama!
              </span>
            </p>
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                Kako do svoje majice:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-500">
                <li>Kontaktirajte nas na Instagramu</li>
                <li>Pošaljite nam Vaše slike na email</li>
                <li>Dobićete preview dizajna pre štampe</li>
              </ol>
            </div>
            
            <div className="pt-4">
              <a
                href="https://instagram.com/avlasti.design"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 sm:py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Kontaktirajte Nas na Instagramu
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>
                  Napomena: Sve majice se rade po porudžbini i vreme izrade i isporuke je 5-7 radnih dana. 
                </p>
              </div>
            </div>
          </div>
          
          {/* Image container */}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomShirt; 