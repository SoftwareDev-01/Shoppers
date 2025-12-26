import React from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({ children }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL || 'https://shoppers-backend-lmwv.onrender.com'
  const value = { serverUrl }

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext
