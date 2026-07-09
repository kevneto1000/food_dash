import { useState, useEffect } from "react";
import api from "../api/axios"
import toast from "react-hot-toast"

export default function ManageRestaurants() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [editingId, setEditingId] = useState<string | null>(null)

    const fetchRestaurants = async () => {
        try {
            const res = await api.get("/restaurants")
            setRestaurants(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createRestaurant = async () => {
        try {
            await api.post("/restaurants", 
                {
                    name, 
                    description,
                    image
                }
            )

            toast.success("Restaurant created")

            setName("")
            setDescription("")
            setImage("")

            fetchRestaurants()

        } catch(error) {
            console.log(error)
            toast.error("Failed to create restaurant")
        }
    }

    const deleteRestaurant = async (id: string) => {
        try {
            const token = localStorage.getItem("token")

            const confirmed = window.confirm(
                "Are you sure you want to delete this restaurant?"
            )

            if (!confirmed) {
                return
            }

            await api.delete(`/restaurants/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success("Restaurant deleted")

            fetchRestaurants()
        }catch(error) {
            console.log(error)
            toast.error("Failed to delete restaurant")
        }
    }

    const editRestaurant = (restaurant: any) => {

        setEditingId(restaurant.id)
        setName(restaurant.name)
        setDescription(restaurant.description)
        setImage(restaurant.image)
    }

    useEffect(() => {
        fetchRestaurants()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">Manage Restaurants 🏢</h1>

            <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">
                        Add New Restaurant 🏢
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Create a new restaurant for your platform
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side */}
                    <div className="space-y-5">
                        <div>
                            <label className="block font-medium mb-2">Restaurant Name</label>

                            <input
                                type="text"
                                placeholder="Enter restaurant name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">Description</label>

                            <textarea
                                rows={4}
                                placeholder="Describe the restaurant..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">Restaurant Image URL</label>

                            <input
                            type="text"
                            placeholder="https://..."
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div>
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

                            <h3 className="font-bold text-xl mt-4">{name || "Restaurant Name"}</h3>

                            <p className="text-gray-500 mt-1">
                                {description || "Restaurant description"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={createRestaurant}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition cursor-pointer"
                    >
                        Create Restaurant                        
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant: any) => (
                    <div key={restaurant.id} className="bg-white rounded-lg shadow p-4">
                        <img
                            src={restaurant.image}
                            className="w-full h-48 object-cover rounded-lg"
                        />

                        <h2 className="font-bold text-xl mt-3">{restaurant.name}</h2>

                        <p className="text-gray-500 mt-2">
                            {restaurant.description}
                        </p>

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => editRestaurant(restaurant)}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg cursor-pointer transition"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteRestaurant(restaurant.id)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg cursor-pointer transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}