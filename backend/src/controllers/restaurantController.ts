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


// UPDATE A RESTAURANT
export const updateRestaurant = async(req: Request, res: Response) => {
  try {
    const id  = req.params.id as string

    const restaurant = await prisma.restaurant.findUnique({
      where: {
          id
      }
    })

    if (!restaurant) {
      return res.status(404).json({
          message: "Restaurant not found"
      })
    }

    const { name, description, image } = req.body

    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id,
      },
      data : {
        name,
        description,
        image
      }
    })

    res.json(updatedRestaurant)

  } catch(error) {
    console.error("updateRestaurant error:", error)

    res.status(500).json({ error: "Something went wrong"  })
  }
}

// DELETE RESTAURANT
export const deleteRestaurant = async(req: Request, res: Response) => {
  try {

    const { id } = req.params as { id: string }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id }
    })

    if (!restaurant) {
      return res.status(404).json({
          message: "Restaurant not found"
      })
    }

    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id }
    })

    res.json({message: "Restaurant deleted successfully", restaurant: deletedRestaurant})
  }catch(error) {
    console.error("deleteRestaurant error:", error)

    res.status(500).json({error: "Failed to delete restaurant"})
  }
}
