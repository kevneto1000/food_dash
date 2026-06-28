import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"

import type { Restaurant, Food } from "../types"

export default function RestaurantMenu() {
  const { id } = useParams()
  const [search, setSearch] = useState("")
  const [foods, setFoods] = useState<Food[]>([])
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const { cartCount, setCartCount } = useCart()

  const filteredFoods = foods.filter((food: any) =>
    food.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  useEffect(() => {
    // get restaurant
    api.get(`/restaurants/${id}`)
      .then(res => setRestaurant(res.data))

    // get foods
    api.get(`/foods/restaurant/${id}`)
      .then(res => setFoods(res.data))
  }, [id])

  const addToCart = async (foodId: string) => {
    try {
      const token = localStorage.getItem("token")

      await api.post(
        "/cart",
        { foodId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success("Added to cart")

      setCartCount(prev => prev + 1)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Restaurant Header */}
      <h1 className="text-3xl font-bold mb-2">
        {restaurant?.name}
      </h1>

      <p className="text-gray-500 mb-6">
        {restaurant?.description}
      </p>

      <input
        type="text"
        placeholder="🔍 Search menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 px-4 py-3 border rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-xl shadow p-4"
          >

            <img
              src={food.image}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h2 className="font-semibold mt-3">
              {food.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {food.description}
            </p>

            <div className="flex justify-between items-center mt-3">

              <span className="font-bold">
                ₦{food.price}
              </span>

              <button
                onClick={() => addToCart(food.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}