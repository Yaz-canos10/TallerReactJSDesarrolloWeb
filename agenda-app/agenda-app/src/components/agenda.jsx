import React, { useState, useEffect } from 'react'
import { ref, push, onValue } from 'firebase/database'
//Importo las configuraciones de autenticación y los componentes de la app
import { auth, database } from '../config/firebase'
import { useAuth } from '../authcontext'
//Importo todos los componentes que cree para la app
import Login from './login'
import Registro from './registro'
import ListaEventos from './listaeventos'
import '../css/agenda.css'


//Componente principal de la agenda
export default function Agenda() {
  //Aqui obtenemos el usuario autenticado
  const { usuario } = useAuth()
  //Almaceno la lista de eventos 
  const [eventos, setEventos] = useState([])
  //Estado para el titulo
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  //Estado para la fecha elegida
  const [nuevaFecha, setNuevaFecha] = useState('')
  //Estado para la descripción
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')
  //Aqui se alterna entre mostrar el formulario de registro y el de inicio de sesion
  const [mostrarRegistro, setMostrarRegistro] = useState(false)

  useEffect(() => {
    if (usuario) {
      //referencio la ubicación de los eventos en la base de datos "eventos"
      const eventosRef = ref(database, 'eventos')
      onValue(eventosRef, (snapshot) => {
        const data = snapshot.val()
        const listaEventos = data ? Object.entries(data).map(([id, evento]) => ({
          id,
          ...evento
        })) : []
        setEventos(listaEventos)
      })
    } else {
      setEventos([])
    }
  }, [usuario])

  //Función flecha para cerrar sesión
  const cerrarSesion = () => {
    auth.signOut() //función de firebase para cerrar sesion
  }

  //Función para agregar nuevo evento
  const agregarEvento = (e) => {
    e.preventDefault()
    if (nuevoTitulo && nuevaFecha && nuevaDescripcion) { //se verifica que todos los campos esten llenos
      const eventosRef = ref(database, 'eventos')
      push(eventosRef, {
        titulo: nuevoTitulo,
        fecha: nuevaFecha,
        descripcion: nuevaDescripcion
      })
      //Estos 3 campos sirven para limpiar los input despues de agregar el nuevo evento
      setNuevoTitulo('')
      setNuevaFecha('')
      setNuevaDescripcion('')
    }
  }

  //Si la persona no esta autenticada muestra el formulario o de inicio de sesion o de registro
  if (!usuario) {
    return (
      <div className="container">
        {mostrarRegistro ? <Registro /> : <Login />}
        <button
          onClick={() => setMostrarRegistro(!mostrarRegistro)}
          style={{ marginTop: '10px', backgroundColor: 'transparent', color: '#007bff' }}
        >
          {mostrarRegistro ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
        </button>
      </div>
    )
  }

  return (
    <div className="container agenda">
      <h1>Agenda de Eventos</h1>
      <div className="card user-info">
        <p>Bienvenido, <strong>{usuario.email}</strong></p>
        <button onClick={cerrarSesion} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>

      <div className="card">
        <h2>Agregar Nuevo Evento</h2>
        <form onSubmit={agregarEvento}>
          <input
            type="text"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            placeholder="Título del evento"
            required
          />
          <input
            type="date"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            required
          />
          <textarea
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
            placeholder="Descripción del evento"
            required
          />
          <button type="submit" className="btn-add">
            Agregar Evento
          </button>
        </form>
      </div>

      <ListaEventos eventos={eventos} />
    </div>
  )
}