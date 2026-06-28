type CartItem = {
  foodId: string
  quantity: number
}

type Cart = {
  userId: string
  items: CartItem[]
}

const carts: Cart[] = []

export default carts