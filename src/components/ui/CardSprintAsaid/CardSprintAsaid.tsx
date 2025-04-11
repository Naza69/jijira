import React from 'react';
import './CardSprintAsaidEstilo.css';
import { ISprint } from '../../../types/ISprint';
import { useAppStore } from '../../../store/SprintStore'; // Importa el store de Zustand
import visibilityIcon from '../../icons/visibility.svg'; // Ícono para "V"
import editNoteIcon from '../../icons/edit_note.svg'; // Ícono para "Ed"
import deleteIcon from '../../icons/delete.svg'; // Ícono para "E"

export const CardSprintAsaid = ({ sprint }: { sprint: ISprint }) => {
    const setSelectedSprint = useAppStore((state) => state.setSelectedSprint);
    const setOpenModal = useAppStore((state) => state.setOpenModal);
    const removeSprint = useAppStore((state) => state.removeSprint);

    const handleViewSprint = () => {
        setSelectedSprint(sprint); // Selecciona el Sprint
        setOpenModal('verSprint'); // Abre el modal de ver Sprint
    };

    const handleEditSprint = () => {
        setSelectedSprint(sprint); // Selecciona el Sprint
        setOpenModal('editarSprint'); // Abre el modal de edición
    };

    const handleDeleteSprint = () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el Sprint "${sprint.title}"?`)) {
            removeSprint(Number(sprint.id)); // Elimina el Sprint
        }
    };

    const handleSelectSprint = () => {
        setSelectedSprint(sprint); // Selecciona el Sprint
    };

    return (
        <div
            className="cardSprintAsaidContenedor"
            onClick={handleSelectSprint} // Agrega el evento onClick al contenedor principal
        >
            <div>
                <h5>{sprint.title}</h5>
                <h6>Inicio: {new Date(sprint.startDate).toLocaleDateString()}</h6>
                <h6>Fin: {new Date(sprint.endDate).toLocaleDateString()}</h6>
            </div>
            <div className="botoneraCardSprint" onClick={(e) => e.stopPropagation() /* HACE QUE SELECCIONE EL SPRINT AL HACER CLICK EN EL CUADRO EN UN AREA CUALQUIERA. NO BORRAR MUY IMPORTANTE*/}>
                <button className="botonCardVerSprint" onClick={handleViewSprint}>
                    <img src={visibilityIcon} alt="Ver Sprint" />
                </button>
                <button className="botonCardEditarSprint" onClick={handleEditSprint}>
                    <img src={editNoteIcon} alt="Editar Sprint" />
                </button>
                <button className="botonCardEliminarSprint" onClick={handleDeleteSprint}>
                    <img src={deleteIcon} alt="Eliminar Sprint" />
                </button>
            </div>
        </div>
    );
};