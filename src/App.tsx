import './App.css'
import { Backlog } from './components/screens/Backlog'
import { AsaidBar } from './components/ui/AsideBar/AsideBar'
import { NavBar } from './components/ui/NavBar/NavBar'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NuevaPantalla } from './components/screens/NuevaPantalla' // Importa la nueva pantalla

function App() {
  return (
    <Router>
      <div className='parent'>
        <div className='navBar'>
          <NavBar></NavBar>
        </div>
        <div className='pantallaPrincipal'>
          <Routes>
            <Route path="/backlog" element={<Backlog />} />
            <Route path="/nueva-pantalla" element={<NuevaPantalla />} />
          </Routes>
        </div>
        <div className='asideBar'>
          <AsaidBar></AsaidBar>
        </div>
      </div>
    </Router>
  )
}

export default App
