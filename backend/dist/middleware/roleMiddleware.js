"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const requireAdmin = (req, res, next) => {
    console.log("REQ USER:", req.user);
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    if (user.role !== "ADMIN") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
exports.requireAdmin = requireAdmin;
