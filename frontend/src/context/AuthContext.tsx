import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect
} from "react"

type AuthContextType = {
  token: string | null
  role: string | null
  login: (
    token: string,
    role: string
  ) => void
  logout: () => void
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  )

export function AuthProvider({
  children
}: {
  children: ReactNode
}) {
  const [token, setToken] =
    useState<string | null>(null)

  const [role, setRole] =
    useState<string | null>(null)

  useEffect(() => {
    const savedToken =
      localStorage.getItem("token")

    const savedRole =
      localStorage.getItem("role")

    if (savedToken) {
      setToken(savedToken)
    }

    if (savedRole) {
      setRole(savedRole)
    }
  }, [])

  const login = (
    token: string,
    role: string
  ) => {
    localStorage.setItem(
      "token",
      token
    )

    localStorage.setItem(
      "role",
      role
    )

    setToken(token)
    setRole(role)
  }

  const logout = () => {
    localStorage.removeItem(
      "token"
    )

    localStorage.removeItem(
      "role"
    )

    setToken(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    )
  }

  return context
}