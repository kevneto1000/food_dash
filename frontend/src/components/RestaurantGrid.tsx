import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

import type { Restaurant } from "../types"

interface Props {
  search: string
}

export default function RestaurantGrid({ search }: Props) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const navigate = useNavigate()

  const filteredRestaurants =
  restaurants.filter((restaurant) =>
    restaurant.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  useEffect(() => {
    api.get("/restaurants")
      .then(res => {
        console.log("API RESPONSE:", res.data)
        setRestaurants(res.data)
    })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-6">
        Popular Restaurants 🍽️
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredRestaurants.map((r) => (
          <div
            key={r.id}
            onClick={() => navigate(`/restaurant/${r.id}`)}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
          >

            {/* Image */}
            <img
              src={r.image || "https://images.unsplash.com/photo-1555992336-03a23c7b20ee"}
              className="h-40 w-full"
            />

            {/* Content */}
            <div className="p-4">

              <h3 className="font-semibold text-lg">
                {r.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {r.description}
              </p>

              {/* Meta Info */}
              <div className="flex justify-between mt-3 text-sm text-gray-600">

                <span>⭐ 4.5</span>
                <span>25-30 min</span>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}