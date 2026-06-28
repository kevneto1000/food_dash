import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();

    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
      navigate("/");
    }
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Admin Orders 🍔</h1>

            <p className="text-gray-500 mt-1">
              Manage and track customer orders
            </p>
          </div>

          <div className="bg-white shadow rounded-2xl px-6 py-4">
            <p className="text-sm text-gray-500">Total Orders</p>

            <h2 className="font-bold text-2xl">{orders.length}</h2>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              className="w-40 mx-auto mb-5"
            />

            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>

            <p className="text-gray-500">Orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* TOP */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex flex-col lg:flex-row justify-between gap-5">
                    {/* LEFT */}
                    <div>
                      <h2 className="font-bold text-xl">
                        Order #{order.id.slice(0, 8)}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        Customer ID: {order.userId.slice(0, 8)}
                      </p>

                      <p className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="text-left lg:text-right">
                      <p className="font-bold text-2xl text-green-600">
                        ₦{order.total.toLocaleString()}
                      </p>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-700"
                            : order.status === "PREPARING"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="p-6 space-y-4">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-50 rounded-2xl p-4"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4">
                        <img
                          src={item.food?.image }
                          className="w-16 h-16 object-cover rounded-xl"
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

                      {/* RIGHT */}
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="border-t p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Update Order Status</p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border rounded-xl px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="PENDING">Pending</option>

                    <option value="PREPARING">Preparing</option>

                    <option value="DELIVERED">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
