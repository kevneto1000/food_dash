import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {

    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            

            const res = await api.get("/admin/dashboard")

            setStats(res.data);
        } catch(error) {
            console.log(error);
        }
    }

    if (!stats) {
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">
                Dashboard 📊
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500">
                    Total Orders
                </p>

                <h2 className="text-3xl font-bold">
                    {stats.totalOrders}
                </h2>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500">
                    Total Revenue
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                    ₦{stats.totalRevenue.toLocaleString()}
                </h2>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500">
                    Foods
                </p>

                <h2 className="text-3xl font-bold">
                    {stats.totalFoods}
                </h2>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500">
                    Restaurants
                </p>

                <h2 className="text-3xl font-bold">
                    {stats.totalRestaurants}
                </h2>
                </div>

            </div>
        </div>
    )
}