export type Food = {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  restaurantId: string
}

export type Restaurant = {
  id: string
  name: string
  description?: string
  image?: string
}
