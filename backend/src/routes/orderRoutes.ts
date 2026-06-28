import express from "express"
import { authMiddleware } from "../middleware/authMiddleware"
import { requireAdmin } from "../middleware/roleMiddleware"
import { createOrder, getOrders, updateOrderStatus, getMyOrders } from "../controllers/orderController"

const router = express.Router()

router.post("/", authMiddleware, createOrder)
router.get("/all", authMiddleware, requireAdmin, getOrders)
router.get("/my-orders", authMiddleware, getMyOrders)
router.patch("/:id/status", authMiddleware, requireAdmin, updateOrderStatus)

export default router