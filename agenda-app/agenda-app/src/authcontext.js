import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth } from './config/firebase'

// Creo el contexto de autenticación para almacenar y compartir el estado de autenticación en la aplicación 
const AuthContext = createContext()

//Esta funcion es la que provee la autenticacion
export function AuthProvider({ children }) {
  //Se almacena el usuario actualmente autenticado
  const [usuario, setUsuario] = useState(null)
  //Esto es para indicar si el estado de autenticacion esta cargado
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Suscribe a los cambios en el estado de autenticación
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuario(user)
      setCargando(false)
    })

    return unsubscribe
  }, [])

  const value = {
    usuario,
    cargando
  }

  return <AuthContext.Provider value={value}>{!cargando && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}