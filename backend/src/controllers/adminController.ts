import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalOrders = await prisma.order.count()

        const totalFoods = await prisma.food.count()

        const totalRestaurants = await prisma.restaurant.count()

        const revenue = await prisma.order.aggregate({
            _sum: {
                total: true
            }
        })

        res.json({
            totalOrders,
            totalFoods,
            totalRestaurants,
            totalRevenue: revenue._sum.total || 0
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: "Failed to fetch dashboard stats"
        })
    }
}