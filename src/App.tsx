import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CrearTareaModal } from './components/modals/CrearTarea/CrearTareaModal';
import './App.css';
import Button from 'react-bootstrap/Button';
import { CrearSprintModal } from './components/modals/CrearSprint/CrearSprintModal';
import { EditarTareaModal } from './components/modals/EditarTareaModal/EditarTareaModal';
import { EditarSprintModal } from './components/modals/EditarSprintModal/EditarSprintModal';
import { NavBar } from './components/navBar/NavBar';
import { AsaidBar } from './components/AsideBar/AsaidBar';
import { useAppStore, AppState } from './store/store';
import { VerSprintModal } from './components/modals/VerSprintModal/VerSprintModal';

function App() {
  const openModal = useAppStore((state: AppState) => state.openModal);
  const setOpenModal = useAppStore((state: AppState) => state.setOpenModal);
  const selectedSprint = useAppStore((state) => state.selectedSprint);

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
      <div className="parent">
        <div className="navBar">
          <NavBar />
        </div>
        <div className="asideBar">
          <AsaidBar />
        </div>
        <div className="pantallaPrincipal">
          <div className={openModal ? 'blur-background' : ''}>
            <Button variant="primary" onClick={() => handleOpenModal('crearTarea')}>
              Crear Tarea
            </Button>
            <Button variant="primary" onClick={() => handleOpenModal('crearSprint')}>
              Crear Sprint
            </Button>
            <Button variant="primary" onClick={() => handleOpenModal('editarTarea')}>
              Editar Tarea
            </Button>
            <Button variant="primary" onClick={() => handleOpenModal('editarSprint')}>
              Editar Sprint
            </Button>
          </div>
        </div>
      </div>
      {openModal === 'crearTarea' && (
        <CrearTareaModal
          modalClass="formularioModal nuevaClase"
          onClose={handleCloseModal}
        />
      )}
      {openModal === 'crearSprint' && (
        <CrearSprintModal
          modalClass="formularioModal nuevaClase"
          onClose={handleCloseModal}
        />
      )}
      {openModal === 'editarTarea' && (
        <EditarTareaModal
          modalClass="formularioModal nuevaClase"
          onClose={handleCloseModal}
        />
      )}
      {openModal === 'editarSprint' && (
        <EditarTareaModal modalClass="formularioModal nuevaClase" onClose={handleCloseModal} />
      )}
      {openModal === 'verSprint' && selectedSprint && (
        <VerSprintModal sprint={selectedSprint} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
