import React from 'react';
import './CardSprintAsaidEstilo.css';
import { ISprint } from '../../types/ISprint';
import { useAppStore } from '../../../store/store'; // Importa el store

export const CardSprintAsaid = ({ sprint }: { sprint: ISprint }) => {
    const setOpenModal = useAppStore((state) => state.setOpenModal);
    const setSelectedSprint = useAppStore((state) => state.setSelectedSprint);

    const handleViewSprint = () => {
        setSelectedSprint(sprint); // Selecciona el sprint
        setOpenModal('verSprint'); // Abre el modal de ver sprint
    };
    const handleEditSprint = () => {
        setSelectedSprint(sprint); // Selecciona el sprint
        setOpenModal('editarSprint'); // Abre el modal de edición
    };

    return (
        <div className="cardSprintAsaidContenedor">
            <div>
                <h5>{sprint.title}</h5>
                <h6>Inicio: {sprint.startDate}</h6>
                <h6>Fin: {sprint.endDate}</h6>
            </div>
            <div className="botoneraCardSprint">
                <button className="botonCardVerSprint" onClick={handleViewSprint}>
                    V
                </button>
                <button className="botonCardEditarSprint" onClick={handleEditSprint}>
                    Ed
                </button>
                <button className="botonCardEliminarSprint">E</button>
            </div>
        </div>
    );
};
