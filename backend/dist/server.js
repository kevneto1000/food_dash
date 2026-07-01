"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const foodRoutes_1 = __importDefault(require("./routes/foodRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const checkoutRoutes_1 = __importDefault(require("./routes/checkoutRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/restaurants", restaurantRoutes_1.default);
app.use("/api/foods", foodRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/cart", cartRoutes_1.default);
app.use("/api/checkout", checkoutRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Food Delivery API Running"
    });
});
app.get("/api/profile", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({ message: "Protected profile data" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
