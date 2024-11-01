import React, { useState } from 'react'
//Importo la funcion de firebase para que se pueda crear un usuario con email y contreña
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import '../css/registro.css'


//Este es el componente principal para el registro
export default function Registro() {
  //Se almacena el email ingresado por el usuario
  const [email, setEmail] = useState('')
  //Aqui la contraseña
  const [password, setPassword] = useState('')
  //Aqui se almacena el mensaje de error (Si llega a suceder)
  const [error, setError] = useState('')

  //Funcion que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //Aqui se hace uso de la función importada para intentar crear un nuevo usuario en firebase
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      //Mensaje para el error
      setError('Error al registrar: ' + error.message)
    }
  }
  //Esta es la parte visual
  return (
    <div className="card registro-form">
      <h2>Registro</h2>
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
        <button type="submit" className="btn-registro">
          Registrarse
        </button>
      </form>
    </div>
  )
}