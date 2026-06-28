import {
  createContext,
  useContext,
  useState,
  ReactNode
} from "react"

type CartContextType = {
  cartCount: number
  setCartCount: React.Dispatch<
    React.SetStateAction<number>
  >
}

const CartContext =
  createContext<CartContextType | null>(
    null
  )

export function CartProvider({
  children
}: {
  children: ReactNode
}) {
  const [cartCount, setCartCount] =
    useState(0)

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context =
    useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    )
  }

  return context
}