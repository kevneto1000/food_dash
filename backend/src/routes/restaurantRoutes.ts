import express from "express"
import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} from "../controllers/restaurantController"

import { authMiddleware } from "../middleware/authMiddleware"
import { requireAdmin } from "../middleware/roleMiddleware"

const router = express.Router()

router.post("/", authMiddleware, requireAdmin, createRestaurant)
router.get("/", getRestaurants)
router.get("/:id", getRestaurant)
router.put("/:id", authMiddleware, requireAdmin, updateRestaurant)
router.delete("/:id", authMiddleware, requireAdmin, deleteRestaurant)

export default router