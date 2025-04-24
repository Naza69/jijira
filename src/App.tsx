//importamcion de librerias
import './App.css'
import { Backlog } from './components/screens/Backlog'
import { SideBar } from './components/ui/SideBar/SideBar'
import { NavBar } from './components/ui/NavBar/NavBar'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NuevaPantalla } from './components/screens/NuevaPantalla'
function App() {
  return (
    <Router>
      <div className='parent'>
        <div className='navBar'>
          <NavBar></NavBar>
        </div>
        <div className='pantallaPrincipal'>
          <Routes>
            <Route path="/" element={<Backlog />} />
            <Route path="/nueva-pantalla" element={<NuevaPantalla />} />
          </Routes>
        </div>
        <div className='sideBar'>
          <SideBar></SideBar>
        </div>
      </div>
    </Router>
  )
}

export default App
