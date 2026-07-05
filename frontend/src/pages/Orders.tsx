import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {

      const res = await api.get("/orders/my-orders");

      toast.success("Order status updated")
      console.log("ORDERS:", res.data);

      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders")
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Orders 📦</h1>

            <p className="text-gray-500 mt-1">Track all your food orders</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              className="w-40 mx-auto mb-5"
            />

            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>

            <p className="text-gray-500">Place your first delicious order 🍔</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* Top */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    {/* Order Info */}
                    <div>
                      <h2 className="font-bold text-xl">
                        Order #{order.id.slice(0, 8)}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Price + Status */}
                    <div className="text-left md:text-right">
                      <p className="font-bold text-2xl text-green-600">
                        ₦{order.total.toLocaleString()}
                      </p>

                      <span
                        className={`
                        inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium
                        ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-700"
                            : order.status === "PROCESSING"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "CANCELLED"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 space-y-4">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 rounded-2xl p-4"
                    >
                      {/* Left */}
                      <div className="flex gap-4 items-center">
                        <img
                          src={
                            item.food?.image ||
                            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
                          }
                          className="w-20 h-20 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.food?.name}
                          </h3>

                          <p className="text-gray-500 text-sm">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
