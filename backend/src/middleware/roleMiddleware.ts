import { Request, Response, NextFunction } from "express"

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("REQ USER:", (req as any).user)

  const user = (req as any).user

  if (!user) {
    return res.status(401).json({
      message:
        "Unauthorized"
    })
  }

  if (user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" })
  }

  next()
}