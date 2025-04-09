import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAppStore } from '../../store/SprintStore';
import { TaskCard } from '../ui/TaskCard/TaskCard';

export function NuevaPantalla() {
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

    return (
        <>
            <div className={`parent ${openModal ? 'blur-background' : ''}`}>
                <div className="pantallaPrincipal">
                    {selectedSprint ? (
                        <div className="sprintDetails">
                            <div className="headerSprintDetails">
                                <h2>Nombre de la Sprint: {selectedSprint.nombre}</h2>
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
        </>
    );
}