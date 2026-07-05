import { useEffect, useState } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"

export default function AdminFoods() {
  const [foods, setFoods] = useState<any[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [restaurantId, setRestaurantId] = useState("")
  const [restaurants, setRestaurants] = useState<any[]>([])

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods/admin")
      setFoods(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRestaurants = async () => {
    try {
        const res = await api.get("/restaurants")
        setRestaurants(res.data)
    } catch (error) {
        console.log(error)
    }
  }

  const createFood = async () => {
    try {

        await api.post(
        "/foods",
        {
            name,
            price: Number(price),
            description,
            image,
            restaurantId
        }
        )

        toast.success("Food created")

        setName("")
        setPrice("")
        setDescription("")
        setImage("")
        setRestaurantId("")

        fetchFoods()

    } catch (error) {
        console.log(error)
    }
  }

  const toggleAvailability = async (foodId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/foods/${foodId}`,
        {
          available: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Food updated")

      fetchFoods();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoods()
    fetchRestaurants()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Foods 🍔</h1>

      <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Add New Food 🍔</h2>

          <p className="text-gray-500 mt-2">
            Create a new menu item for your restaurants
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-2">Food Name</label>

              <input
                type="text"
                placeholder="e.g Cheeseburger"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Price (₦)</label>

              <input
                type="number"
                placeholder="4500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Restaurant</label>

              <select
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <option value="">Select Restaurant</option>

                {restaurants.map((restaurant: any) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Description</label>

              <textarea
                rows={4}
                placeholder="Describe the food..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <label className="block font-medium mb-2">Food Image URL</label>

            <input
              type="text"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* LIVE PREVIEW */}
            <div className="bg-gray-50 rounded-2xl p-5 border">
              <p className="font-semibold mb-4">Preview</p>

              <img
                src={
                  image ||
                  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
                }
                className="w-full h-64 object-cover rounded-xl"
              />

              <h3 className="font-bold text-xl mt-4">{name || "Food Name"}</h3>

              <p className="text-gray-500 mt-1">
                {description || "Food description"}
              </p>

              <p className="text-green-600 font-bold text-xl mt-3">
                ₦{Number(price || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={createFood}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition cursor-pointer"
          >
            Create Food
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food: any) => (
          <div key={food.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={food.image}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h2 className="font-bold text-xl mt-3">{food.name}</h2>

            <p className="text-gray-500">₦{food.price.toLocaleString()}</p>

            <div className="flex items-center justify-between mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  food.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {food.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <button
              onClick={() => toggleAvailability(food.id, food.available)}
              className={`w-full mt-3 py-2 rounded-xl font-medium cursor-pointer transition  ${ food.available ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
            >
              {food.available ? "Mark Unavailable" : "Mark Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}