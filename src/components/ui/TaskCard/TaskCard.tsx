import React from 'react';
import './TaskCardEstilo.css';
import visibilityIcon from '../../icons/visibility.svg';
import editNoteIcon from '../../icons/edit_note.svg';
import deleteIcon from '../../icons/delete.svg';
import chevronRightIcon from '../../icons/chevron_right.svg';
import { useTareaStore, useSprintStore, useBacklogStore } from '../../../store/store';
import Swal from "sweetalert2";
import { useTarea } from '../../../components/hooks/useTarea'; // Cambia la importación a `useTarea`
import { useSprint } from '../../hooks/useSprint';
import { backlogPut } from '../../../http/backlogPut'; // Importa la función para actualizar el backlog
import { SprintPut } from '../../../http/SrintPut'; // Importa la función para actualizar el sprint
import { ISprint } from '../../../types/ISprint'; // Importa el tipo ISprint

// Define the Task type
type Task = {
    id: string | number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};

export const TaskCard = ({ task }: { task: Task }) => {
    const selectedSprint = useSprintStore((state) => state.selectedSprint);
    const setOpenModal = useSprintStore((state) => state.setOpenModal);
    const setActiveTarea = useTareaStore((state) => state.setActiveTarea);
    const updateSprint = useSprintStore((state) => state.setArraySprints);
    const addTarea = useTareaStore((state) => state.addNewTarea);

    const { updateExistingTarea } = useTarea(); // Obtén la función desde el hook
    const { updateTareaInSprint } = useSprint();

    // Handler para enviar al backlog
    const handleSendToBacklog = async () => {
        if (!selectedSprint) return;

        const tareasActualizadas = selectedSprint.tareas.filter(t => t.id !== task.id.toString());
        const sprintActualizado = { ...selectedSprint, tareas: tareasActualizadas };

        const tareaParaBacklog = {
            id: task.id.toString(),
            titulo: task.title,
            descripcion: task.description,
            fechaLimite: task.dueDate,
            estado: "backlog"
        };

        try {
            // Actualiza solo el sprint afectado
            await SprintPut(sprintActualizado);

            // Agrega la tarea al backlog en el servidor
            await backlogPut([...useBacklogStore.getState().backlog, tareaParaBacklog]);

            // Actualiza el estado local
            useSprintStore.getState().updateSprint(sprintActualizado);
            useBacklogStore.getState().setBacklog([
                ...useBacklogStore.getState().backlog,
                tareaParaBacklog,
            ]);

            console.log("Tarea enviada al backlog y sprint actualizado:", sprintActualizado);
        } catch (error) {
            console.error("Error al enviar la tarea al backlog:", error);
        }
    };
    // Handler para ver tarea
    const handleView = () => {
        setActiveTarea({
            id: task.id.toString(),
            titulo: task.title,
            descripcion: task.description,
            fechaLimite: task.dueDate,
            estado: task.status
        });
        setOpenModal('verTarea');
    };

    // Handler para editar tarea
    const handleEdit = async () => {
        setActiveTarea({
            id: task.id.toString(),
            titulo: task.title,
            descripcion: task.description,
            fechaLimite: task.dueDate,
            estado: task.status
        });
        setOpenModal('editarTarea');

        const updatedTarea = {
            id: task.id.toString(),
            titulo: task.title,
            descripcion: task.description,
            fechaLimite: task.dueDate,
            estado: task.status
        };

        try {
            await updateExistingTarea(updatedTarea); // Actualiza en el servidor

            const tareasActualizadas = selectedSprint?.tareas.map(t =>
                t.id === task.id.toString() ? updatedTarea : t
            );
            const sprintActualizado: ISprint = {
                ...selectedSprint!, // Aseguramos que `selectedSprint` no sea null
                tareas: tareasActualizadas || [] // Garantizamos que `tareas` sea un array
            };

            // ✅ Usar hook directamente para evitar errores de getState
            const sprints = useSprintStore.getState().sprints;
            const setArraySprints = useSprintStore.getState().setArraySprints;

            const sprintsActualizados = sprints.map(sprint =>
                sprint.id === sprintActualizado.id ? sprintActualizado : sprint
            );
            setArraySprints(sprintsActualizados);

            console.log("Estado de la tarea actualizado:", updatedTarea);
        } catch (error) {
            console.error("Error al cambiar el estado de la tarea:", error);
        }
    };

    // Handler para eliminar tarea del sprint
    const handleDelete = async () => {
        if (!selectedSprint) return;

        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la tarea del Sprint y no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;

        const tareasActualizadas = selectedSprint.tareas.filter(t => t.id !== task.id.toString());
        const sprintActualizado = { ...selectedSprint, tareas: tareasActualizadas };

        try {
            // Actualiza el servidor
            await SprintPut(sprintActualizado); // Actualiza solo las tareas del sprint en el servidor

            // Actualiza el estado local
            useSprintStore.getState().updateSprint(sprintActualizado); // Actualiza el sprint específico en el estado local

            console.log("Tarea eliminada del sprint:", sprintActualizado);
            Swal.fire("Eliminado", "La tarea fue eliminada del Sprint.", "success");
        } catch (error) {
            console.error("Error al eliminar la tarea del sprint:", error);
        }
    };

    const handleNextState = async () => {
        if (!selectedSprint) return;

        console.log("Cambiando estado de la tarea:", task);

        let nuevoEstado = "";
        if (task.status === "pendiente") {
            nuevoEstado = "en_progreso";
        } else if (task.status === "en_progreso") {
            nuevoEstado = "completado";
        } else {
            console.log("Estado no válido para avanzar:", task.status);
            return;
        }

        const updatedTarea = {
            id: task.id.toString(),
            titulo: task.title,
            descripcion: task.description,
            fechaLimite: task.dueDate,
            estado: nuevoEstado,
        };

        try {
            await updateTareaInSprint(selectedSprint.id, updatedTarea); // Actualiza en el servidor
            const tareasActualizadas = selectedSprint.tareas.map(t =>
                t.id === task.id.toString() ? updatedTarea : t
            );
            const sprintActualizado = { ...selectedSprint, tareas: tareasActualizadas };

            // Obtén las funciones y el estado directamente desde el hook
            const setArraySprints = useSprintStore((state) => state.setArraySprints);
            const sprints = useSprintStore((state) => state.sprints);

            if (setArraySprints && Array.isArray(sprints)) {
                // Actualiza el estado global de los sprints correctamente
                const sprintsActualizados = sprints.map(sprint =>
                    sprint.id === sprintActualizado.id ? sprintActualizado : sprint
                );
                setArraySprints(sprintsActualizados);

                console.log("Estado de la tarea actualizado:", updatedTarea);
            } else {
                console.error("Error: setArraySprints no está definido o sprints no es un array.");
            }
        } catch (error) {
            console.error("Error al cambiar el estado de la tarea:", error);
        }
    };

    return (
        <div className="taskCard">
            <h5>Titulo: {task.title}</h5>
            <p>Descripcion: {task.description}</p>
            <p>Fecha limite: {task.dueDate}</p>
            <div className="taskCardButtons">
                <button className="btnBacklog" onClick={handleSendToBacklog}>
                    Enviar al Backlog
                </button>
                <button
                    className="btnChevron"
                    onClick={handleNextState}
                >
                    <img src={chevronRightIcon} alt="Siguiente estado" />
                </button>
                <button className="btnIcon" onClick={() => {
                    console.log("Botón 'Ver' presionado");
                    console.log("Tarea actual:", task);

                    handleView();
                }}>
                    <img src={visibilityIcon} alt="Ver" />
                </button>
                <button className="btnIcon" onClick={() => {
                    console.log("Botón 'Editar' presionado");
                    console.log("Tarea actual:", task);

                    handleEdit();
                }}>
                    <img src={editNoteIcon} alt="Editar" />
                </button>
                <button className="btnDelete" onClick={handleDelete}>
                    <img src={deleteIcon} alt="Eliminar" />
                </button>
            </div>
        </div>
    );
};