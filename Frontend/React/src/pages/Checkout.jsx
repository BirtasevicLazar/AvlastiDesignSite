import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ExclamationCircleIcon, ShoppingBagIcon, TruckIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

// Lista svih zemalja sveta
const countries = [
  { code: 'RS', name: 'Srbija' }, // Stavljamo Srbiju na prvo mesto
  { code: 'AF', name: 'Avganistan' },
  { code: 'AX', name: 'Olandska Ostrva' },
  { code: 'AL', name: 'Albanija' },
  { code: 'DZ', name: 'Alžir' },
  { code: 'AS', name: 'Američka Samoa' },
  { code: 'AD', name: 'Andora' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Angvila' },
  { code: 'AQ', name: 'Antarktik' },
  { code: 'AG', name: 'Antigva i Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Jermenija' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australija' },
  { code: 'AT', name: 'Austrija' },
  { code: 'AZ', name: 'Azerbejdžan' },
  { code: 'BS', name: 'Bahami' },
  { code: 'BH', name: 'Bahrein' },
  { code: 'BD', name: 'Bangladeš' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belorusija' },
  { code: 'BE', name: 'Belgija' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Butan' },
  { code: 'BO', name: 'Bolivija' },
  { code: 'BA', name: 'Bosna i Hercegovina' },
  { code: 'BW', name: 'Bocvana' },
  { code: 'BV', name: 'Ostrvo Buve' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BG', name: 'Bugarska' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Kambodža' },
  { code: 'CM', name: 'Kamerun' },
  { code: 'CA', name: 'Kanada' },
  { code: 'CV', name: 'Zelenortska Ostrva' },
  { code: 'KY', name: 'Kajmanska Ostrva' },
  { code: 'CF', name: 'Centralnoafrička Republika' },
  { code: 'TD', name: 'Čad' },
  { code: 'CL', name: 'Čile' },
  { code: 'CN', name: 'Kina' },
  { code: 'CX', name: 'Božićno Ostrvo' },
  { code: 'CC', name: 'Kokosova Ostrva' },
  { code: 'CO', name: 'Kolumbija' },
  { code: 'KM', name: 'Komori' },
  { code: 'CG', name: 'Kongo' },
  { code: 'CD', name: 'DR Kongo' },
  { code: 'CK', name: 'Kukova Ostrva' },
  { code: 'CR', name: 'Kostarika' },
  { code: 'CI', name: 'Obala Slonovače' },
  { code: 'HR', name: 'Hrvatska' },
  { code: 'CU', name: 'Kuba' },
  { code: 'CY', name: 'Kipar' },
  { code: 'CZ', name: 'Češka' },
  { code: 'DK', name: 'Danska' },
  { code: 'DJ', name: 'Džibuti' },
  { code: 'DM', name: 'Dominika' },
  { code: 'DO', name: 'Dominikanska Republika' },
  { code: 'EC', name: 'Ekvador' },
  { code: 'EG', name: 'Egipat' },
  { code: 'SV', name: 'Salvador' },
  { code: 'GQ', name: 'Ekvatorijalna Gvineja' },
  { code: 'ER', name: 'Eritreja' },
  { code: 'EE', name: 'Estonija' },
  { code: 'ET', name: 'Etiopija' },
  { code: 'FK', name: 'Foklandska Ostrva' },
  { code: 'FO', name: 'Farska Ostrva' },
  { code: 'FJ', name: 'Fidži' },
  { code: 'FI', name: 'Finska' },
  { code: 'FR', name: 'Francuska' },
  { code: 'GF', name: 'Francuska Gvajana' },
  { code: 'PF', name: 'Francuska Polinezija' },
  { code: 'TF', name: 'Francuske Južne Teritorije' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambija' },
  { code: 'GE', name: 'Gruzija' },
  { code: 'DE', name: 'Nemačka' },
  { code: 'GH', name: 'Gana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Grčka' },
  { code: 'GL', name: 'Grenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Gvadelup' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Gvatemala' },
  { code: 'GG', name: 'Gernzi' },
  { code: 'GN', name: 'Gvineja' },
  { code: 'GW', name: 'Gvineja Bisao' },
  { code: 'GY', name: 'Gvajana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HM', name: 'Herd i Makdonald Ostrva' },
  { code: 'VA', name: 'Vatikan' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Mađarska' },
  { code: 'IS', name: 'Island' },
  { code: 'IN', name: 'Indija' },
  { code: 'ID', name: 'Indonezija' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Irak' },
  { code: 'IE', name: 'Irska' },
  { code: 'IM', name: 'Ostrvo Man' },
  { code: 'IL', name: 'Izrael' },
  { code: 'IT', name: 'Italija' },
  { code: 'JM', name: 'Jamajka' },
  { code: 'JP', name: 'Japan' },
  { code: 'JE', name: 'Džerzi' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazahstan' },
  { code: 'KE', name: 'Kenija' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'Severna Koreja' },
  { code: 'KR', name: 'Južna Koreja' },
  { code: 'KW', name: 'Kuvajt' },
  { code: 'KG', name: 'Kirgistan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Letonija' },
  { code: 'LB', name: 'Liban' },
  { code: 'LS', name: 'Lesoto' },
  { code: 'LR', name: 'Liberija' },
  { code: 'LY', name: 'Libija' },
  { code: 'LI', name: 'Lihtenštajn' },
  { code: 'LT', name: 'Litvanija' },
  { code: 'LU', name: 'Luksemburg' },
  { code: 'MO', name: 'Makao' },
  { code: 'MK', name: 'Severna Makedonija' },
  { code: 'MG', name: 'Madagaskar' },
  { code: 'MW', name: 'Malavi' },
  { code: 'MY', name: 'Malezija' },
  { code: 'MV', name: 'Maldivi' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Maršalska Ostrva' },
  { code: 'MQ', name: 'Martinik' },
  { code: 'MR', name: 'Mauritanija' },
  { code: 'MU', name: 'Mauricijus' },
  { code: 'YT', name: 'Majot' },
  { code: 'MX', name: 'Meksiko' },
  { code: 'FM', name: 'Mikronezija' },
  { code: 'MD', name: 'Moldavija' },
  { code: 'MC', name: 'Monako' },
  { code: 'MN', name: 'Mongolija' },
  { code: 'ME', name: 'Crna Gora' },
  { code: 'MS', name: 'Monserat' },
  { code: 'MA', name: 'Maroko' },
  { code: 'MZ', name: 'Mozambik' },
  { code: 'MM', name: 'Mjanmar' },
  { code: 'NA', name: 'Namibija' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Holandija' },
  { code: 'NC', name: 'Nova Kaledonija' },
  { code: 'NZ', name: 'Novi Zeland' },
  { code: 'NI', name: 'Nikaragva' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigerija' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Ostrvo' },
  { code: 'MP', name: 'Severna Marijanska Ostrva' },
  { code: 'NO', name: 'Norveška' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestina' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua Nova Gvineja' },
  { code: 'PY', name: 'Paragvaj' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Filipini' },
  { code: 'PN', name: 'Pitkern' },
  { code: 'PL', name: 'Poljska' },
  { code: 'PT', name: 'Portugalija' },
  { code: 'PR', name: 'Portoriko' },
  { code: 'QA', name: 'Katar' },
  { code: 'RE', name: 'Reunion' },
  { code: 'RO', name: 'Rumunija' },
  { code: 'RU', name: 'Rusija' },
  { code: 'RW', name: 'Ruanda' },
  { code: 'BL', name: 'Sveti Bartolomej' },
  { code: 'SH', name: 'Sveta Helena' },
  { code: 'KN', name: 'Sveti Kits i Nevis' },
  { code: 'LC', name: 'Sveta Lucija' },
  { code: 'MF', name: 'Sveti Martin' },
  { code: 'PM', name: 'Sen Pjer i Mikelon' },
  { code: 'VC', name: 'Sveti Vinsent i Grenadini' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome i Principe' },
  { code: 'SA', name: 'Saudijska Arabija' },
  { code: 'SN', name: 'Senegal' },
  { code: 'SC', name: 'Sejšeli' },
  { code: 'SL', name: 'Sijera Leone' },
  { code: 'SG', name: 'Singapur' },
  { code: 'SK', name: 'Slovačka' },
  { code: 'SI', name: 'Slovenija' },
  { code: 'SB', name: 'Solomonska Ostrva' },
  { code: 'SO', name: 'Somalija' },
  { code: 'ZA', name: 'Južnoafrička Republika' },
  { code: 'ES', name: 'Španija' },
  { code: 'LK', name: 'Šri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Surinam' },
  { code: 'SJ', name: 'Svalbard i Jan Majen' },
  { code: 'SZ', name: 'Svazilend' },
  { code: 'SE', name: 'Švedska' },
  { code: 'CH', name: 'Švajcarska' },
  { code: 'SY', name: 'Sirija' },
  { code: 'TW', name: 'Tajvan' },
  { code: 'TJ', name: 'Tadžikistan' },
  { code: 'TZ', name: 'Tanzanija' },
  { code: 'TH', name: 'Tajland' },
  { code: 'TL', name: 'Istočni Timor' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad i Tobago' },
  { code: 'TN', name: 'Tunis' },
  { code: 'TR', name: 'Turska' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks i Kaikos Ostrva' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukrajina' },
  { code: 'AE', name: 'Ujedinjeni Arapski Emirati' },
  { code: 'GB', name: 'Velika Britanija' },
  { code: 'US', name: 'Sjedinjene Američke Države' },
  { code: 'UY', name: 'Urugvaj' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venecuela' },
  { code: 'VN', name: 'Vijetnam' },
  { code: 'VG', name: 'Britanska Devičanska Ostrva' },
  { code: 'VI', name: 'Američka Devičanska Ostrva' },
  { code: 'WF', name: 'Valis i Futuna' },
  { code: 'EH', name: 'Zapadna Sahara' },
  { code: 'YE', name: 'Jemen' },
  { code: 'ZM', name: 'Zambija' },
  { code: 'ZW', name: 'Zimbabve' }
];

// Komponenta za pretraživanje zemalja
const CountrySelect = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const selectedCountry = countries.find(country => country.code === value);
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full px-4 py-2 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer flex items-center justify-between`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setSearch('');
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }}
      >
        <span>{selectedCountry?.name || 'Izaberite zemlju'}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pretraži zemlje..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="py-1">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${
                  country.code === value ? 'bg-gray-50' : ''
                }`}
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                }}
              >
                {country.name}
                {country.code === value && (
                  <CheckIcon className="w-5 h-5 text-blue-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total } = useCart();
  const finalTotal = Number(total).toFixed(2);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: 'RS', // Default je Srbija
    city: '',
    street: '',
    houseNumber: '',
    floor: '',
    apartment: '',
    postalCode: '',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validacija
    if (!formData.email) {
      newErrors.email = 'Email je obavezan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Unesite važeću email adresu';
    }

    // Telefon validacija
    if (!formData.phone) {
      newErrors.phone = 'Broj telefona je obavezan';
    } else if (!/^[0-9+]{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Unesite važeći broj telefona';
    }

    // Ime validacija
    if (!formData.firstName) {
      newErrors.firstName = 'Ime je obavezno';
    }

    // Prezime validacija
    if (!formData.lastName) {
      newErrors.lastName = 'Prezime je obavezno';
    }

    // Zemlja validacija
    if (!formData.country) {
      newErrors.country = 'Zemlja je obavezna';
    }

    // Grad validacija
    if (!formData.city) {
      newErrors.city = 'Grad je obavezan';
    }

    // Ulica validacija
    if (!formData.street) {
      newErrors.street = 'Ulica je obavezna';
    }

    // Broj validacija
    if (!formData.houseNumber) {
      newErrors.houseNumber = 'Broj je obavezan';
    }

    // Poštanski broj validacija
    if (!formData.postalCode) {
      newErrors.postalCode = 'Poštanski broj je obavezan';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Poštanski broj mora imati 5 cifara';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implementirati API poziv za čuvanje porudžbine
      console.log('Order data:', { 
        ...formData, 
        items: cart, 
        total: finalTotal,
        countryName: countries.find(c => c.code === formData.country)?.name 
      });
      
      // Simuliramo uspešno slanje (ovo ćemo zameniti pravim API pozivom kasnije)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Očistiti korpu i preusmeriti na stranicu uspeha
      // clearCart();
      navigate('/success');
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrors({ submit: 'Došlo je do greške prilikom slanja porudžbine. Molimo pokušajte ponovo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Očisti grešku za to polje ako postoji
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Forma za unos podataka */}
          <div className="flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Podaci za dostavu
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email i Telefon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email adresa *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="vasa@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Broj telefona *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="+381 60 123 4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Ime i Prezime */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Ime *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prezime *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Zemlja i Grad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Zemlja *
                    </label>
                    <CountrySelect
                      value={formData.country}
                      onChange={(code) => handleChange({ target: { name: 'country', value: code } })}
                      error={errors.country}
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Grad *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.city ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* Ulica i broj */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Ulica *
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.street ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.street && (
                      <p className="mt-1 text-sm text-red-600">{errors.street}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Broj *
                    </label>
                    <input
                      type="text"
                      id="houseNumber"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.houseNumber ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.houseNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>
                    )}
                  </div>
                </div>

                {/* Poštanski broj, Sprat i Stan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Poštanski broj *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="11000"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
                      Sprat
                    </label>
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                      Stan
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Napomena */}
                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                    Napomena
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dodatne napomene za dostavu..."
                  />
                </div>

                {/* Greška pri slanju */}
                {errors.submit && (
                  <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-2 text-red-600">
                    <ExclamationCircleIcon className="h-5 w-5" />
                    <p>{errors.submit}</p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Pregled porudžbine */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Pregled porudžbine
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Međuzbir:</span>
                  <span>{total.toFixed(2)} RSD</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Dostava (plaćanje pouzećem):</span>
                  <span>Plaća se kuriru</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Ukupno za plaćanje:</span>
                    <span>{finalTotal} RSD + dostava</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Plaćanje pouzećem prilikom isporuke
                  </p>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-4 text-base font-medium rounded-xl text-white transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {isSubmitting ? 'Slanje porudžbine...' : 'Potvrdi porudžbinu'}
              </button>

              {/* Dodatne informacije */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <TruckIcon className="w-5 h-5 mr-2 text-gray-400" />
                    Dostava kurirskom službom
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ShoppingBagIcon className="w-5 h-5 mr-2 text-gray-400" />
                    {cart.length} {cart.length === 1 ? 'proizvod' : 'proizvoda'} u korpi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 