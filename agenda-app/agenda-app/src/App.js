import React from 'react'
//importo el componente de autenticación
import { AuthProvider } from './authcontext'
import Agenda from './components/agenda'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Agenda />
      </div>
    </AuthProvider>
  )
}

export default App