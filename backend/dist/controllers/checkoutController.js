"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const cartStore_1 = __importDefault(require("../utils/cartStore"));
const checkout = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = cartStore_1.default.find((c) => c.userId === userId);
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        let total = 0;
        const orderItems = [];
        for (const item of cart.items) {
            const food = await prisma_1.default.food.findUnique({
                where: { id: item.foodId }
            });
            if (!food) {
                return res.status(400).json({
                    message: "Some items are no longer available"
                });
            }
            total += food.price * item.quantity;
            orderItems.push({
                foodId: food.id,
                quantity: item.quantity,
                price: food.price
            });
        }
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
        // clear cart
        cart.items = [];
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Checkout failed" });
    }
};
exports.checkout = checkout;
