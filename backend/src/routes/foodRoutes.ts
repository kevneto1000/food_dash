import express from "express"
import { createFood, getFoods, getRestaurantMenu, deleteFood, updateFood, getAllFoodsAdmin } from "../controllers/foodController"
import { authMiddleware } from "../middleware/authMiddleware"
import { requireAdmin } from "../middleware/roleMiddleware"

const router = express.Router()

router.post("/", authMiddleware, requireAdmin, createFood)
router.get("/", getFoods)
router.get("/admin", authMiddleware, requireAdmin, getAllFoodsAdmin)
router.get("/restaurant/:id", getRestaurantMenu)
router.delete("/:id", authMiddleware, requireAdmin, deleteFood)
router.put("/:id", authMiddleware, requireAdmin, updateFood)

export default router