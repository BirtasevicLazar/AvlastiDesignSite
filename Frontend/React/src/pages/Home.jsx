import Hero from '../components/home/Hero'
import PopularProducts from '../components/home/PopularProducts'
import CustomShirt from '../components/home/CustomShirt'
import Separator from '../components/home/Separator'

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Separator />
      <CustomShirt />
      <PopularProducts />
    </div>
  )
} 