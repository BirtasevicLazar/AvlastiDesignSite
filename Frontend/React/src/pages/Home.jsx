import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero'

const featuredProducts = [
  {
    id: 1,
    name: 'Klasična bela majica',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt: 'Bela pamučna majica sa okruglim izrezom.',
    price: '2500',
    color: 'Bela',
  },
  {
    id: 2,
    name: 'Crna majica sa printom',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Crna majica sa unikatnim printom.',
    price: '3000',
    color: 'Crna',
  },
  {
    id: 3,
    name: 'Siva dukserica',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-03.jpg',
    imageAlt: 'Siva dukserica sa kapuljačom.',
    price: '4500',
    color: 'Siva',
  },
  // Više proizvoda...
]

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      
      {/* Popularni proizvodi sekcija */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Popularni proizvodi</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{product.price} RSD</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 