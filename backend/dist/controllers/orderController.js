"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getMyOrders = exports.getOrders = exports.createOrder = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
// CREATE ORDER
const createOrder = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.userId;
        const { items } = req.body;
        let total = 0;
        const orderItems = await Promise.all(items.map(async (item) => {
            const food = await prisma_1.default.food.findUnique({
                where: { id: item.foodId }
            });
            const price = food?.price || 0;
            total += price * item.quantity;
            return {
                foodId: item.foodId,
                quantity: item.quantity,
                price
            };
        }));
        const order = await prisma_1.default.order.create({
            data: {
                userId,
                total,
                items: {
                    create: orderItems
                }
            },
            include: {
                items: true
            }
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};
exports.createOrder = createOrder;
// GET ALL ORDERS
const getOrders = async (req, res) => {
    try {
        const orders = await prisma_1.default.order.findMany({
            include: {
                items: {
                    include: {
                        food: true
                    }
                },
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
exports.getOrders = getOrders;
// GET USER ORDERS
const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await prisma_1.default.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        food: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
exports.getMyOrders = getMyOrders;
// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const order = await prisma_1.default.order.update({
            where: { id },
            data: { status }
        });
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
