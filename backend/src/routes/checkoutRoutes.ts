import express from "express"
import { checkout } from "../controllers/checkoutController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/", authMiddleware, checkout)

export default router