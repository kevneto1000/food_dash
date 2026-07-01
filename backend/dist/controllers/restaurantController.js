"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurant = exports.getRestaurants = exports.createRestaurant = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
// CREATE RESTAURANT
const createRestaurant = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const restaurant = await prisma_1.default.restaurant.create({
            data: {
                name,
                image,
                description
            }
        });
        res.json(restaurant);
    }
    catch (error) {
        console.error("createRestaurant error:", error);
        res.status(500).json({ error: "Failed to create restaurant" });
    }
};
exports.createRestaurant = createRestaurant;
// GET ALL RESTAURANTS
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await prisma_1.default.restaurant.findMany();
        res.json(restaurants);
    }
    catch (error) {
        console.error("getRestaurants error:", error);
        res.status(500).json({ error: "Failed to fetch restaurants" });
    }
};
exports.getRestaurants = getRestaurants;
// GET ONE RESTAURANT
const getRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await prisma_1.default.restaurant.findUnique({
            where: { id }
        });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.json(restaurant);
    }
    catch (error) {
        console.error("getRestaurant error:", error);
        res.status(500).json({ error: "Failed to fetch restaurant" });
    }
};
exports.getRestaurant = getRestaurant;
