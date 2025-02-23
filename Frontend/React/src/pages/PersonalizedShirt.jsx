import React from 'react';
import { motion } from 'framer-motion';
import tshirtVideo from '../assets/images/tshirt-video.mp4';


const PersonalizedShirt = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative h-full container mx-auto px-4">
        <div className="bg-white py-8 sm:py-12 md:py-16 mt-20">
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
                <video className="w-full h-auto rounded-2xl shadow-2xl" autoPlay muted loop>
                    <source src={tshirtVideo} type="video/mp4" />
                    Vaš pregledač ne podržava video tag.
                </video>
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
      </div>
    </div>
  );
};

export default PersonalizedShirt; 