import { Request, Response } from "express"
import prisma from "../utils/prisma"
import carts from "../utils/cartStore"


// ADD TO CART
export const addToCart = (req: Request, res: Response) => {
  const userId = (req as any).user.userId

  const { foodId, quantity } = req.body

  let cart = carts.find((c: any) => c.userId === userId)

  if (!cart) {
    cart = { userId, items: [] }
    carts.push(cart)
  }

  const existingItem = cart.items.find((i: any) => i.foodId === foodId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.items.push({ foodId, quantity })
  }

  res.json(cart)
}


// FETCH CART
export const getCart = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user
    const userId = user.userId

    const cart = carts.find(c => c.userId === userId)

    if (!cart) {
      return res.json({
        userId,
        items: []
      })
    }

    const enrichedItems = await Promise.all(
      cart.items.map(async (item) => {
        const food = await prisma.food.findUnique({
          where: {
            id: item.foodId
          }
        })

        return {
          ...item,
          food
        }
      })
    )

    res.json({
      userId,
      items: enrichedItems
    })

  } catch (error) {
    res.status(500).json({
      error: "Failed to get cart"
    })
  }
}

// REMOVE FROM CART
export const removeCartItem = (
  req: Request,
  res: Response
) => {
  const user = (req as any).user
  const userId = user.userId

  const { foodId } = req.body

  const cart = carts.find(
    c => c.userId === userId
  )

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found"
    })
  }

  cart.items = cart.items.filter(
    item => item.foodId !== foodId
  )

  res.json({
    message: "Item removed",
    cart
  })
}

// UPDATE CART
export const updateCartQuantity = (
  req: Request,
  res: Response
) => {
  const user = (req as any).user
  const userId = user.userId

  const { foodId, action } = req.body

  const cart = carts.find(c => c.userId === userId)

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found"
    })
  }

  const item = cart.items.find(
    i => i.foodId === foodId
  )

  if (!item) {
    return res.status(404).json({
      message: "Item not found"
    })
  }

  if (action === "increase") {
    item.quantity += 1
  }

  if (action === "decrease") {
    item.quantity -= 1

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        i => i.foodId !== foodId
      )
    }
  }

  res.json(cart)
}


