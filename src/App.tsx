import './App.css'
import { Backlog } from './components/screens/Backlog'
import { AsaidBar } from './components/ui/AsideBar/AsideBar'
import { NavBar } from './components/ui/NavBar/NavBar'
import React from 'react'
function App() {

  return (
    <>
      <div className='parent'>
        <div className='navBar'>
          <NavBar></NavBar>
        </div>
        <div className='pantallaPrincipal'>
          <Backlog></Backlog>
        </div>
        <div className='asideBar'>
          <AsaidBar></AsaidBar>
        </div>
      </div>
    </>
  )
}

export default App
