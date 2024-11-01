import React, { useState } from 'react'
//Importo la función de Firebase que permite iniciar sesión
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import '../css/login.css'

//Este es el componente principal para el login
export default function Login() {
  //Aqui se alamcena el email ingresad
  const [email, setEmail] = useState('')
  //Almacena la contraseña ingresada
  const [password, setPassword] = useState('')
  //...... El error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //Hago uso de la función para intentar iniciar sesión en Firebase con el email y la contra
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      //Mensaje de error
      setError('Error al iniciar sesión: ' + error.message)
    }
  }

  return (
    <div className="card login-form">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}