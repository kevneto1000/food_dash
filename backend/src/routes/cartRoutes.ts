import express from "express"
import { addToCart, getCart, removeCartItem, updateCartQuantity } from "../controllers/cartController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/", authMiddleware, addToCart)
router.get("/", authMiddleware, getCart)
router.delete("/remove", authMiddleware, removeCartItem)
router.put("/", authMiddleware, updateCartQuantity)

export default router