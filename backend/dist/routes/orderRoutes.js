"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, orderController_1.createOrder);
router.get("/all", authMiddleware_1.authMiddleware, roleMiddleware_1.requireAdmin, orderController_1.getOrders);
router.get("/my-orders", authMiddleware_1.authMiddleware, orderController_1.getMyOrders);
router.patch("/:id/status", authMiddleware_1.authMiddleware, roleMiddleware_1.requireAdmin, orderController_1.updateOrderStatus);
exports.default = router;
