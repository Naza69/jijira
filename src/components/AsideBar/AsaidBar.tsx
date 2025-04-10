import React, { useState } from 'react';
import "./AsaidBarEstilo.css";
import { CardSprintAsaid } from './cardSprintAsaid/CardSprintAsaid';
import { useAppStore } from '../../store/store';
import addBoxIcon from '../icons/add_box.svg';
import { CrearSprintModal } from '../modals/CrearSprint/CrearSprintModal';

export const AsaidBar = () => {
    const sprints = useAppStore((state) => state.sprints);
    const setOpenModal = useAppStore((state) => state.setOpenModal);
    const [openModalSprint, setOpenModalSprint] = useState(false);

    const handleOpenModal = (modalName: string) => {
        setOpenModal(modalName);
    };
    const handleCloseCrearSprintModal = () => {
        setOpenModalSprint(false)
    }

    return (
        <div className='asideBarContenedor'>
            <div className='botoneraBacklog'>
                <button className='botonBlacklog'>
                    <h6>Backlog</h6>
                </button>
            </div>
            <div className='divListaSprints'>
                <div className="headerListaSprints">
                    <h4>Lista de Sprints</h4>
                    <button className="botonCrearSprint" onClick={() => setOpenModalSprint(true)}>
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
                {openModalSprint && (
                    (() => {
                        try {
                            return (
                                <CrearSprintModal
                                    modalClass="formularioModal nuevaClase"
                                    onClose={handleCloseCrearSprintModal}
                                />
                            );
                        } catch (error) {
                            console.error("Error al renderizar CrearSprintModal:", error);
                            return <p>Ocurrió un error al cargar el modal.</p>;
                        }
                    })()
                )}
            </div>
        </div>
    );
};