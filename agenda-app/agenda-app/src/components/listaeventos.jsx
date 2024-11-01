import React from 'react'
//Importo las funciones ref y remove de Firebase
import { ref, remove } from 'firebase/database'
//Importo el objeto database configurado desde Firebase
import { database } from '../config/firebase'
import '../css/listaeventos.css'

//Componente principal para la Lista de Eventos.
export default function ListaEventos({ eventos }) {
  //Esta función fue creada para eliminar cualquier evento de la base de datos usando su respectivo ID
  const eliminarEvento = (id) => {
    //Creo el puente a la ubicación especifica del evento en la base de datos
    const eventoRef = ref(database, `eventos/${id}`)
    //Sirve para eliminar el evento de la BD
    remove(eventoRef)
  }

  return (
    <div className="card lista-eventos">
      <h2>Eventos Programados</h2>
      {eventos.length === 0 ? (
        <p>No hay eventos programados.</p>
      ) : (
        <ul>
          {eventos.map((evento) => (
            <li key={evento.id}>
              <h3>{evento.titulo}</h3>
              <p><strong>Fecha:</strong> {evento.fecha}</p>
              <p>{evento.descripcion}</p>
              <button
                onClick={() => eliminarEvento(evento.id)}
                className="btn-delete"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}