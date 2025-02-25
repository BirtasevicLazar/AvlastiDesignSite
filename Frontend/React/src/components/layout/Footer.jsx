import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const navigation = {
  main: [
    { name: 'Početna', href: '/' },
    { name: 'Proizvodi', href: '/products' },
    { name: 'Personalizovana majica', href: '/personalized-shirt' },
  ],
  social: [
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@avlasti.design',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/avlasti.design/',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Gornji deo footer-a */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Leva strana - Logo i opis */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Link to="/" className="inline-block">
                <img
                  src={logo}
                  alt="AvlastiDesign Logo"
                  className="h-12 w-auto brightness-0"
                />
              </Link>
              <p className="mt-6 text-base text-gray-600 max-w-sm">
                Kreiramo jedinstvene dizajne koji inspirišu i ostavljaju trajan utisak u svetu mode.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start space-x-6">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Desna strana - Navigacija i kontakt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">
                  Brzi linkovi
                </h3>
                <nav className="flex flex-col space-y-4">
                  {navigation.main.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-base text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">
                  Kontakt
                </h3>
                <div className="flex flex-col space-y-4">
                  <a
                    href="mailto:support@avlastidesign.com"
                    className="text-base text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    support@avlastidesign.com
                  </a>
                  <p className="text-base text-gray-600">
                    Beograd, Srbija
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donji deo footer-a */}
        <div className="border-t border-gray-100 py-8">
          <div className="flex justify-center">
            <p className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} AvlastiDesign. Sva prava zadržana.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 