import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { CrearTareaModal } from './components/modals/CrearTarea/CrearTareaModal';
import { CrearSprintModal } from './components/modals/CrearSprint/CrearSprintModal';
import { EditarTareaModal } from './components/modals/EditarTareaModal/EditarTareaModal';
import { EditarSprintModal } from './components/modals/EditarSprintModal/EditarSprintModal';
import { VerSprintModal } from './components/modals/VerSprintModal/VerSprintModal';
import { NavBar } from './components/navBar/NavBar';
import { AsaidBar } from './components/AsideBar/AsaidBar';
import { useAppStore } from './store/store';
import React from 'react';
import { TaskCard } from './components/TaskCard/TaskCard';

function App() {
  const openModal = useAppStore((state) => state.openModal);
  const setOpenModal = useAppStore((state) => state.setOpenModal);
  const selectedSprint = useAppStore((state) => state.selectedSprint);
  const tasks = useAppStore((state) => state.tasks);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [openModal]);

  const handleOpenModal = (modalName: string) => {
    setOpenModal(modalName);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <div className={`parent ${openModal ? 'blur-background' : ''}`}>
        <div className="navBar">
          <NavBar />
        </div>
        <div className="asideBar">
          <AsaidBar />
        </div>
        <div className="pantallaPrincipal">
          {selectedSprint ? (
            <div className="sprintDetails">
              <div className="headerSprintDetails">
                <h2>Nombre de la Sprint: {selectedSprint.title}</h2>
                <div className="crearTareaContainer">
                  <h3>Tareas en la Sprint</h3>
                  <button
                    className="botonCrearTarea"
                    onClick={() => handleOpenModal('crearTarea')}
                  >
                    Crear Tarea
                  </button>
                </div>
              </div>
              <div className="columnsContainer">
                <div className="column pendiente">
                  <h4>Pendiente</h4>
                  {tasks
                    .filter((task) => task.status === 'pendiente')
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </div>
                <div className="column enProgreso">
                  <h4>En progreso</h4>
                </div>
                <div className="column completado">
                  <h4>Completado</h4>
                </div>
              </div>
            </div>
          ) : (
            <p>Selecciona una Sprint para ver los detalles.</p>
          )}
        </div>
      </div>
      {openModal === 'crearTarea' && (
        <CrearTareaModal modalClass="formularioModal nuevaClase" onClose={handleCloseModal} />
      )}
      {openModal === 'crearSprint' && (
        <CrearSprintModal modalClass="formularioModal nuevaClase" onClose={handleCloseModal} />
      )}
      {openModal === 'editarTarea' && (
        <EditarTareaModal modalClass="formularioModal nuevaClase" onClose={handleCloseModal} />
      )}
      {openModal === 'editarSprint' && (
        <EditarSprintModal modalClass="formularioModal nuevaClase" onClose={handleCloseModal} />
      )}
      {openModal === 'verSprint' && selectedSprint && (
        <VerSprintModal sprint={selectedSprint} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;