import img from "../assets/food_hero.jpg"

interface HeroProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Hero = ({ search, setSearch }: HeroProps) => {
  return (
    <div className="relative h-[400px]">

      <img
        src={img}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">

        <h1 className="text-white text-4xl font-bold mb-3 text-center">
          Find Your Favorite Food
        </h1>

        <p className="text-white mb-6 text-center">
          Order delicious meals from top restaurants
        </p>

        <div 
          className="flex bg-white rounded-2xl overflow-hidden shadow-xl"
        >
          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-4 text-black focus:outline-none"
          />

          <button className="bg-green-500 px-8 text-white font-semibold">
            Search
          </button>
        </div>

      </div>
    </div>
  )
}

export default Hero