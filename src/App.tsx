//importamcion de librerias
import './App.css'
import { Backlog } from './components/screens/Backlog'
import { SideBar } from './components/ui/SideBar/SideBar'
import { NavBar } from './components/ui/NavBar/NavBar'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NuevaPantalla } from './components/screens/NuevaPantalla'
import { useAppStore } from './store/SprintStore'
import { ISprint } from './types/ISprint'
import { useSprintStore } from './store/store'

function App() {

  const addSprint = useSprintStore((state) => state.addSprint);

 // useEffect(() => {
 //   // Carga los sprints desde json-server
 //   fetch('http://localhost:3000/sprintList/') // Asegurate de que esté corriendo el json-server
 //     .then(res => res.json())
 //     .then(data => {
 //       if (data?.sprints) {
 //         data.sprints.forEach((sprint: ISprint) => addSprint(sprint));
 //       }
 //     })
 //     .catch(err => console.error("Error cargando sprints:", err));
 // }, [addSprint]);
 
  useEffect(() => {
    fetch('http://localhost:3000/sprintList')
      .then(res => {
        if (!res.ok) throw new Error("Error de red");
        return res.json();
      })
      .then((data) => {
        const sprints = data.sprints;
        if (Array.isArray(sprints)) {
          sprints.forEach(addSprint);
          console.log("Sprints cargados:", sprints);
        } else {
          console.error("La propiedad 'sprints' no es un array");
        }
      })
      .catch(err => console.error("Error cargando sprints:", err));
  }, [addSprint]);

  return (
    <Router>
      <div className='parent'>
        <div className='navBar'>
          <NavBar></NavBar>
        </div>
        <div className='pantallaPrincipal'>
          <Routes>
            <Route path="/" element={<Backlog />} />
            <Route path="/nueva-pantalla/:idSprint" element={<NuevaPantalla />} />
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
