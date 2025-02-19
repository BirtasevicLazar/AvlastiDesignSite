import React from 'react';
import girlfriendShirt from '../../assets/images/girlfriend-shirt.jpg';

const CustomShirt = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <img
              src={girlfriendShirt}
              alt="Custom Girlfriend Shirt Template"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Napravite Vašu Personalizovanu Majicu
            </h2>
            <p className="text-lg text-gray-500">
              Želite li posebnu majicu sa Vašim omiljenim trenucima? Napravite jedinstvenu "Girlfriend" majicu sa Vašim fotografijama! Pošaljite nam Vaše omiljene slike preko Instagrama, i mi ćemo ih uklopiti u ovaj moderni dizajn.
            </p>
            <div className="mt-8">
              <a
                href="https://instagram.com/avlasti.design"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-200"
              >
                Kontaktirajte Nas na Instagramu
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              * Sve slike moraju biti jasne i visokog kvaliteta za najbolje rezultate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomShirt; 