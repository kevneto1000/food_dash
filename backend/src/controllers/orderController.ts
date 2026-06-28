import { Request, Response } from "express"
import prisma from "../utils/prisma"


// CREATE ORDER
export const createOrder = async (req: Request, res: Response) => {
  try {

    const user = (req as any).user
    const userId = user.userId

    const { items } = req.body

    let total = 0

    const orderItems = await Promise.all(
      items.map(async (item: any) => {
        const food = await prisma.food.findUnique({
          where: { id: item.foodId }
        })

        const price = food?.price || 0
        total += price * item.quantity

        return {
          foodId: item.foodId,
          quantity: item.quantity,
          price
        }
      })
    )

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

    res.status(201).json(order)

  } catch (error) {
    res.status(500).json({ error: "Failed to create order" })
  }
}


// GET ALL ORDERS
export const getOrders = async (req: Request, res: Response) => {
  try {

    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            food: true
          }
        },
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(orders)

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" })
  }
}

// GET USER ORDERS
export const getMyOrders = async (req: Request, res: Response) => {
  try {

    const userId = (req as any).user.userId

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            food: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    res.json(orders)

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" })
  }
}


// UPDATE ORDER STATUS
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id as string
    const { status } = req.body

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    })

    res.json(order)
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" })
  }
}