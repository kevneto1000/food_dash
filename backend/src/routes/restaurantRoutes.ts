import express from "express"
import {
  createRestaurant,
  getRestaurants,
  getRestaurant
} from "../controllers/restaurantController"

import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/", authMiddleware, createRestaurant)
router.get("/", getRestaurants)
router.get("/:id", getRestaurant)

export default router