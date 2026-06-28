import { useState } from "react"

import Hero from "../components/Hero"
import RestaurantGrid from "../components/RestaurantGrid"

const Home = () => {

  const [search, setSearch] = useState("");

  return (
    <div>
        <Hero
          search={search}
          setSearch={setSearch}
        />

        <RestaurantGrid
          search={search}
        />
    </div>
  )
}

export default Home