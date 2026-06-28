import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const { setCartCount } = useCart();
  const navigate = useNavigate();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCart(res.data.items);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (
    foodId: string,
    action: "increase" | "decrease",
  ) => {
    const token = localStorage.getItem("token");

    if (action === "increase") {
      setCartCount((prev) => prev + 1);
    }

    if (action === "decrease") {
      setCartCount((prev) => Math.max(prev - 1, 0));
    }

    await api.put(
      "/cart",
      {
        foodId,
        action,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchCart();
  };

  const removeItem = async (foodId: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete("/cart/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          foodId,
        },
      });

      fetchCart();

      const removedItem = cart.find((item) => item.foodId === foodId);

      if (removedItem) {
        toast.success("Item removed");
        setCartCount((prev) => prev - removedItem.quantity);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.food?.price || 0) * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              className="w-40 mx-auto mb-5"
            />

            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>

            <p className="text-gray-500">
              Add delicious meals to get started 🍔
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item: any) => (
                <div
                  key={item.foodId}
                  className="bg-white rounded-3xl shadow-md p-5 flex gap-5 hover:shadow-lg transition"
                >
                  {/* Food Image */}
                  <img
                    src={
                      item.food?.image ||
                      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
                    }
                    className="w-32 h-32 object-cover rounded-2xl"
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="font-bold text-xl">{item.food?.name}</h2>

                        <p className="text-gray-500 text-sm mt-1">
                          {item.food?.description}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.foodId)}
                        className="text-red-500 font-semibold hover:text-red-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Bottom */}
                    <div className="flex justify-between items-center mt-5">
                      {/* Quantity */}
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.foodId, "decrease")
                          }
                          className="font-bold text-xl cursor-pointer"
                        >
                          -
                        </button>

                        <span className="font-semibold">{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.foodId, "increase")
                          }
                          className="font-bold text-xl cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-bold text-lg text-green-600">
                        ₦
                        {(
                          (item.food?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-28">
                <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₦1,500</span>
                  </div>
                </div>

                <div className="border-t my-5"></div>

                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>

                  <span>₦{(total + 1500).toLocaleString()}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl mt-6 transition cursor-pointer"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
