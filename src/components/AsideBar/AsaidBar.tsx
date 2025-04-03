import React from 'react';
import "./AsaidBarEstilo.css";
import { CardSprintAsaid } from './cardSprintAsaid/CardSprintAsaid';
import { useAppStore } from '../../store/store';
import addBoxIcon from '../icons/add_box.svg';

export const AsaidBar = () => {
    const sprints = useAppStore((state) => state.sprints);
    const setOpenModal = useAppStore((state) => state.setOpenModal);

    const handleOpenModal = () => {
        setOpenModal('crearSprint');
    };

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
                    <button className="botonCrearSprint" onClick={handleOpenModal}>
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
        </div>
    );
};