//importamcion de librerias
import './App.css'
import { Backlog } from './components/screens/Backlog'
import { AsaidBar } from './components/ui/AsideBar/AsideBar'
import { NavBar } from './components/ui/NavBar/NavBar'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NuevaPantalla } from './components/screens/NuevaPantalla'
function App() {
  return (
    <Router>
      {/* div principal que se encarga de gestionar el grid */}
      <div className='parent'>
        <div className='navBar'>
          {/*El navBar de momento es solo decorativo*/}
          <NavBar></NavBar>
        </div>
        <div className='pantallaPrincipal'>
          <Routes>
            {/* Define las rutas de tu aplicación aquí */}
            <Route path="/backlog" element={<Backlog />} />
            <Route path="/nueva-pantalla" element={<NuevaPantalla />} />{/*Nombre temporal*/}
          </Routes>
        </div>
        <div className='asideBar'>
          {/*Definicion del asaidBar*/}
          <AsaidBar></AsaidBar>
        </div>
      </div>
    </Router>
  )
}

export default App
