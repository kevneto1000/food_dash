"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantController_1 = require("../controllers/restaurantController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, restaurantController_1.createRestaurant);
router.get("/", restaurantController_1.getRestaurants);
router.get("/:id", restaurantController_1.getRestaurant);
exports.default = router;
