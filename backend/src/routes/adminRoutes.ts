import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/roleMiddleware";
import { getDashboardStats } from "../controllers/adminController";

const router = express.Router();

router.get("/dashboard", authMiddleware, requireAdmin, getDashboardStats)

export default router;