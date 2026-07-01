"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.getAllFoodsAdmin = exports.getRestaurantMenu = exports.updateFood = exports.getFoods = exports.createFood = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createFood = async (req, res) => {
    try {
        const { name, price, restaurantId, image, description } = req.body;
        const food = await prisma_1.default.food.create({
            data: {
                name,
                price,
                image,
                description,
                restaurantId
            }
        });
        res.status(201).json(food);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create food" });
    }
};
exports.createFood = createFood;
const getFoods = async (req, res) => {
    try {
        const foods = await prisma_1.default.food.findMany({
            include: {
                restaurant: true
            },
            where: {
                available: true
            }
        });
        res.json(foods);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch foods" });
    }
};
exports.getFoods = getFoods;
const updateFood = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, description, image, available } = req.body;
        const food = await prisma_1.default.food.update({
            where: { id },
            data: {
                name,
                price,
                description,
                image,
                available
            }
        });
        res.json(food);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to update food"
        });
    }
};
exports.updateFood = updateFood;
const getRestaurantMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const foods = await prisma_1.default.food.findMany({
            where: {
                restaurantId: id
            }
        });
        res.json(foods);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch menu" });
    }
};
exports.getRestaurantMenu = getRestaurantMenu;
const getAllFoodsAdmin = async (req, res) => {
    try {
        const foods = await prisma_1.default.food.findMany({
            include: {
                restaurant: true
            }
        });
        res.json(foods);
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch foods"
        });
    }
};
exports.getAllFoodsAdmin = getAllFoodsAdmin;
const deleteFood = async (req, res) => {
    try {
        const id = req.params.id;
        const existingOrderItems = await prisma_1.default.orderItem.findMany({
            where: { foodId: id }
        });
        if (existingOrderItems.length > 0) {
            return res.status(400).json({
                message: "Cannot delete food already used in orders"
            });
        }
        const food = await prisma_1.default.food.delete({
            where: { id }
        });
        res.json({
            message: "Food deleted successfully",
            food
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to delete food"
        });
    }
};
exports.deleteFood = deleteFood;
