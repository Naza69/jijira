import React from 'react';
import './TaskCardEstilo.css';
import visibilityIcon from '../../icons/visibility.svg';
import editNoteIcon from '../../icons/edit_note.svg';
import deleteIcon from '../../icons/delete.svg';
import { Task } from '../../../store/SprintStore';

export const TaskCard = ({ task }: { task: Task }) => {
    return (
        <div className="taskCard">
            <h5>Titulo: {task.title}</h5>
            <p>Descripcion: {task.description}</p>
            <p>Fecha limite: {task.dueDate}</p>
            <div className="taskCardButtons">
                <button className="btnBacklog">Enviar al Backlog</button>
                <button className="btnIcon">
                    <img src={visibilityIcon} alt="Ver" />
                </button>
                <button className="btnIcon">
                    <img src={editNoteIcon} alt="Editar" />
                </button>
                <button className="btnDelete">
                    <img src={deleteIcon} alt="Eliminar" />
                </button>
            </div>
        </div>
    );
};