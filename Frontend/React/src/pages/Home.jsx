import Hero from '../components/home/Hero'
import PopularProducts from '../components/home/PopularProducts'
import CustomShirt from '../components/home/CustomShirt'

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <CustomShirt />
      <PopularProducts />
    </div>
  )
} 