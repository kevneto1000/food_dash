import { Request, Response } from "express"
import prisma from "../utils/prisma"

export const createFood = async (req: Request, res: Response) => {
  try {
    const { name, price, restaurantId, image, description } = req.body

    const food = await prisma.food.create({
      data: {
        name,
        price,
        image,
        description,
        restaurantId
      }
    })

    res.status(201).json(food)
  } catch (error) {
    res.status(500).json({ error: "Failed to create food" })
  }
}

export const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany({
      include: {
        restaurant: true
      },
      where: {
        available: true
      }
    })

    res.json(foods)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch foods" })
  }
}

export const updateFood = async (
  req: Request,
  res: Response
) => {
  try {
    const  id  = req.params.id as string

    const {
      name,
      price,
      description,
      image,
      available
    } = req.body

    const food = await prisma.food.update({
      where: { id },
      data: {
        name,
        price,
        description,
        image,
        available
      }
    })

    res.json(food)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: "Failed to update food"
    })
  }
}

export const getRestaurantMenu = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const foods = await prisma.food.findMany({
      where: {
        restaurantId: id
      }
    })

    res.json(foods)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" })
  }
}

export const getAllFoodsAdmin = async (req: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany({
      include: {
        restaurant: true
      }
    })

    res.json(foods)
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch foods"
    })
  }
}

export const deleteFood = async (req: Request,res: Response) => {
  try {
    const id =
      req.params.id as string

    const existingOrderItems =
      await prisma.orderItem.findFirst({
        where: { foodId: id }
      })

    if (existingOrderItems) {
      return res.status(400).json({
        message:
          "Cannot delete food already used in orders"
      })
    }

    const food =
      await prisma.food.delete({
        where: { id }
      })

    res.json({
      message:
        "Food deleted successfully",
      food
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      error:
        "Failed to delete food"
    })
  }
}