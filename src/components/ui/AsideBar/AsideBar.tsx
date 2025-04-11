import React, { useEffect } from 'react';
import "./AsaidBarEstilo.css";
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/store';
import addBoxIcon from '../../icons/add_box.svg';
import { CardSprintAsaid } from '../CardSprintAsaid/CardSprintAsaid';
import { CrearSprintModal } from '../modals/CrearSprint/CrearSprintModal';

export const AsaidBar = () => {
    const navigate = useNavigate();
    const sprints = useAppStore((state) => state.sprints);
    const openModal = useAppStore((state) => state.openModal);
    const setOpenModal = useAppStore((state) => state.setOpenModal);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [openModal]);

    const handleOpenCrearSprintModal = () => {
        setOpenModal('crearSprint'); // Cambia el estado global `openModal` a 'crearSprint'
    };

    const handleCloseModal = () => {
        setOpenModal(null);
    };

    return (
        <div className='asideBarContenedor'>
            <div className='botoneraBacklog'>
                <button className='botonBlacklog' onClick={() => navigate('/backlog')}>
                    <h6>Backlog</h6>
                </button>
            </div>
            <div className='divListaSprints'>
                <div className="headerListaSprints">
                    <h4>Lista de Sprints</h4>
                    <button className="botonCrearSprint" onClick={handleOpenCrearSprintModal}>
                        <img src={addBoxIcon} alt="Crear Sprint" className="iconoCrearSprint" />
                    </button>
                </div>
                {sprints.length === 0 ? (
                    <p>No hay sprints creados.</p>
                ) : (
                    sprints.map((sprint) => (
                        <CardSprintAsaid key={sprint.id} sprint={sprint} />
                    ))
                )}
            </div>
            {openModal === 'crearSprint' && (
                <div className="modalOverlay">
                    <CrearSprintModal
                        modalClass="formularioModal nuevaClase"
                        onClose={handleCloseModal} // Cierra el modal al cambiar el estado `openModal` a `null`
                    />
                </div>
            )}
        </div>
    );
};