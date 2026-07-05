import { useState } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

import axios from "axios"

export default function Checkout() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setCartCount } = useCart()

  const placeOrder = async () => {
    try {
      setLoading(true)

      await api.post(
        "/checkout",
        {}
      )

      // reset cart badge
      setCartCount(0)

      toast.success("Order placed successfully 🎉")

      navigate("/orders")

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)

        alert(
          error.response?.data?.message ||
          "Order failed"
        )
      } else {
        alert("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white shadow-lg p-6 rounded-xl w-[400px]">

        <h1 className="text-2xl font-bold mb-4">
          Checkout
        </h1>

        <p className="text-gray-600 mb-6">
          Review your items and place order
        </p>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </div>
  )
}