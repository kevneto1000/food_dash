"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await prisma_1.default.order.count();
        const totalFoods = await prisma_1.default.food.count();
        const totalRestaurants = await prisma_1.default.restaurant.count();
        const revenue = await prisma_1.default.order.aggregate({
            _sum: {
                total: true
            }
        });
        res.json({
            totalOrders,
            totalFoods,
            totalRestaurants,
            totalRevenue: revenue._sum.total || 0
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to fetch dashboard stats"
        });
    }
};
exports.getDashboardStats = getDashboardStats;
