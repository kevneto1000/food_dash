"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodController_1 = require("../controllers/foodController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, roleMiddleware_1.requireAdmin, foodController_1.createFood);
router.get("/", foodController_1.getFoods);
router.get("/admin", authMiddleware_1.authMiddleware, roleMiddleware_1.requireAdmin, foodController_1.getAllFoodsAdmin);
router.get("/restaurant/:id", foodController_1.getRestaurantMenu);
router.delete("/:id", authMiddleware_1.authMiddleware, roleMiddleware_1.requireAdmin, foodController_1.deleteFood);
router.put("/:id", authMiddleware_1.authMiddleware, roleMiddleware_1.requireAdmin, foodController_1.updateFood);
exports.default = router;
