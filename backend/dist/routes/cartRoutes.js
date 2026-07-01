"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, cartController_1.addToCart);
router.get("/", authMiddleware_1.authMiddleware, cartController_1.getCart);
router.delete("/remove", authMiddleware_1.authMiddleware, cartController_1.removeCartItem);
router.put("/", authMiddleware_1.authMiddleware, cartController_1.updateCartQuantity);
exports.default = router;
