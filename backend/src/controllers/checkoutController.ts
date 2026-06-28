import { Request, Response } from "express"
import prisma from "../utils/prisma"
import carts from "../utils/cartStore"

export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId

    const cart = carts.find((c: any) => c.userId === userId)

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    let total = 0
    const orderItems: any[] = []

    for (const item of cart.items) {
      const food = await prisma.food.findUnique({
        where: { id: item.foodId }
      })

      if (!food) {
         return res.status(400).json({
          message: "Some items are no longer available"
        })
      }

      total += food.price * item.quantity

      orderItems.push({
        foodId: food.id,
        quantity: item.quantity,
        price: food.price
      })
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: orderItems
        }
      },
      include: {
        items: true
      }
    })

    // clear cart
    cart.items = []

    res.json(order)

  } catch (error) {
    res.status(500).json({ error: "Checkout failed" })
  }
}