"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartQuantity = exports.removeCartItem = exports.getCart = exports.addToCart = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const cartStore_1 = __importDefault(require("../utils/cartStore"));
// ADD TO CART
const addToCart = (req, res) => {
    const userId = req.user.userId;
    const { foodId, quantity } = req.body;
    let cart = cartStore_1.default.find((c) => c.userId === userId);
    if (!cart) {
        cart = { userId, items: [] };
        cartStore_1.default.push(cart);
    }
    const existingItem = cart.items.find((i) => i.foodId === foodId);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.items.push({ foodId, quantity });
    }
    res.json(cart);
};
exports.addToCart = addToCart;
// FETCH CART
const getCart = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.userId;
        const cart = cartStore_1.default.find(c => c.userId === userId);
        if (!cart) {
            return res.json({
                userId,
                items: []
            });
        }
        const enrichedItems = await Promise.all(cart.items.map(async (item) => {
            const food = await prisma_1.default.food.findUnique({
                where: {
                    id: item.foodId
                }
            });
            return {
                ...item,
                food
            };
        }));
        res.json({
            userId,
            items: enrichedItems
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to get cart"
        });
    }
};
exports.getCart = getCart;
// REMOVE FROM CART
const removeCartItem = (req, res) => {
    const user = req.user;
    const userId = user.userId;
    const { foodId } = req.body;
    const cart = cartStore_1.default.find(c => c.userId === userId);
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }
    cart.items = cart.items.filter(item => item.foodId !== foodId);
    res.json({
        message: "Item removed",
        cart
    });
};
exports.removeCartItem = removeCartItem;
// UPDATE CART
const updateCartQuantity = (req, res) => {
    const user = req.user;
    const userId = user.userId;
    const { foodId, action } = req.body;
    const cart = cartStore_1.default.find(c => c.userId === userId);
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }
    const item = cart.items.find(i => i.foodId === foodId);
    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }
    if (action === "increase") {
        item.quantity += 1;
    }
    if (action === "decrease") {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            cart.items = cart.items.filter(i => i.foodId !== foodId);
        }
    }
    res.json(cart);
};
exports.updateCartQuantity = updateCartQuantity;
