import { Request, Response } from "express"
import prisma from "../utils/prisma"

// CREATE RESTAURANT
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        image,
        description
      }
    })

    res.json(restaurant)
  } catch (error) {
    console.error("createRestaurant error:", error)
    res.status(500).json({ error: "Failed to create restaurant" })
  }
}


// GET ALL RESTAURANTS
export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany()

    res.json(restaurants)
  } catch (error) {
    console.error("getRestaurants error:", error)
    res.status(500).json({ error: "Failed to fetch restaurants" })
  }
}


// GET ONE RESTAURANT
export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id as string

    const restaurant = await prisma.restaurant.findUnique({
      where: { id }
    })

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.json(restaurant)
  } catch (error) {
    console.error("getRestaurant error:", error)
    res.status(500).json({ error: "Failed to fetch restaurant" })
  }
}