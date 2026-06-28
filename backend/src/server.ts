import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes"
import restaurantRoutes from "./routes/restaurantRoutes"
import foodRoutes from "./routes/foodRoutes"
import orderRoutes from "./routes/orderRoutes"
import cartRoutes from "./routes/cartRoutes"
import checkoutRoutes from "./routes/checkoutRoutes"
import adminRoutes from "./routes/adminRoutes"
import { authMiddleware } from "./middleware/authMiddleware"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/restaurants", restaurantRoutes)
app.use("/api/foods", foodRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/admin", adminRoutes)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Food Delivery API Running"
  })
})

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected profile data" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})