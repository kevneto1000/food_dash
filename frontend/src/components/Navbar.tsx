import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"

import api from "../api/axios"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const {cartCount, setCartCount} = useCart();

  const { token, role, logout } = useAuth()

  const navigate = useNavigate()

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token")

      if (!token) return

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const totalItems = res.data.items.reduce(
        (sum: number, item: any) =>
          sum + item.quantity,
        0
      )

      setCartCount(totalItems)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCartCount()
  }, [])

  const handleLogout = () => {
    logout()

    navigate("/")
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-500">
          FoodDash
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-500">
              Home
            </Link>

            {role === "ADMIN" && (
              <>
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-green-500">
                  Dashboard
                </Link>
                
                <Link to="/orders" className="text-gray-700 hover:text-green-500">
                  Orders
                </Link>
              </>
            )}

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-green-500"
            >
              <div className="relative cursor-pointer">
                <button className="text-2xl">🛒</button>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {role === "ADMIN" && (
              <>
                <Link
                  to="/admin/orders"
                  className="text-gray-700 hover:text-green-500 font-medium transition"
                >
                  Admin Orders
                </Link>

                <Link
                  to="/admin/foods"
                  className="text-gray-700 hover:text-green-500 font-medium transition"
                >
                  Manage Foods
                </Link>

                <Link
                  to="/admin/restaurants"
                  className="text-gray-700 hover:text-green-500 font-medium transition"
                >
                  Manage Restaurants
                </Link>
              </>
            )}

            {token && (
              <span className="text-sm text-gray-500">Welcome back 👋</span>
            )}

            {token ? (
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
              >
                Login
              </Link>
            )}

            {!token && (
              <Link
                to="/signup"
                className="text-gray-700 hover:text-green-500 transition"
              >
                Sign Up
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-3xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col p-5 gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            {token && (
              <Link to="/orders" onClick={() => setMenuOpen(false)}>
                My Orders
              </Link>
            )}

            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart ({cartCount})
            </Link>

            {role === "ADMIN" && (
              <>
                <Link to="/admin/orders" onClick={() => setMenuOpen(false)}>
                  Admin Orders
                </Link>

                <Link to="/admin/foods" onClick={() => setMenuOpen(false)}>
                  Manage Foods
                </Link>
              </>
            )}

            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-green-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-green-500 text-white py-2 rounded-lg text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}