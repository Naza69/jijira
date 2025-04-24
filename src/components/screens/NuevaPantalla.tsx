import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SprintsEstilo.css";
import { useSprintStore } from '../../store/store';
import { TaskCard } from '../ui/TaskCard/TaskCard';
import { CrearSprintModal } from '../ui/modals/CrearSprint/CrearSprintModal';
import { CrearTareaModal } from '../ui/modals/CrearTareaModal/CrearTareaModal';
import { VerTareaModal } from '../ui/modals/VerTareaModal/VerTareaModal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function NuevaPantalla() {
    const openModal = useSprintStore((state) => state.openModal);
    const setOpenModal = useSprintStore((state) => state.setOpenModal);
    const selectedSprint = useSprintStore((state) => state.selectedSprint);
    const [openCrearTareaModal, setOpenCrearTareaModal] = useState(false);

    //const selectedSprintTwo = useAppStore((state) => state.selectedSprint)
    const navigate = useNavigate()
    const {idSprint} = useParams()
    console.log(idSprint)
    const setSelectedSprint = useSprintStore((state) => state.setSelectedSprint)
    const sprints = useSprintStore((state) => state.sprints)

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [openModal]);

    //useEffect(() => {
    //    if(!selectedSprint && idSprint && sprints.length > 0) {
    //        const sprint = sprints.find((s) => String(s.id) === idSprint)
    //        if(sprint) {
    //            setSelectedSprint(sprint)
    //        }
    //    }
    //}, [idSprint, selectedSprint, sprints, setSelectedSprint])
    
    useEffect(() => {
        console.log("Checking for sprint with ID:", idSprint, "in", sprints);
        const fetchSprint = async () =>{
            
        if (idSprint && sprints.length > 0) {
            console.log("🔄 Buscando sprint con ID:", idSprint);
            const sprint = sprints.find((s) => String(s.id) === idSprint);
            console.log(sprint)
            if (sprint) {
                console.log("✅ Sprint encontrado:", sprint);
            

                    setSelectedSprint(sprint);
                    console.log(selectedSprint) //ACA PUEDE ESTAR EL PROBLEMA
            } else {
                console.warn("No sprint encontrado con ese ID");
            } 
        }
        }
        if (idSprint ){
            fetchSprint()
        }
    }, [idSprint]);

    return (
        <>
            <div className="pantallaPrincipal">
                {selectedSprint! ? (
                    <div className="sprintDetails">
                        <div className="headerSprintDetails">
                            <h2>Nombre de la Sprint: {selectedSprint.title}</h2>
                            <div className="crearTareaContainer">
                                <h3>Tareas en la Sprint</h3>
                                <button
                                    className="botonCrearTarea"
                                    onClick={() => setOpenCrearTareaModal(true)}
                                >
                                    Agregar tarea al Sprint
                                </button>
                            </div>
                        </div>
                        <div className="columnsContainer">
                            <div className="column pendiente">
                                <h4>Pendiente</h4>
                                {selectedSprint?.tareas
                                    ?.filter((tarea) => tarea.estado === "pendiente")
                                    .map((tarea) => (
                                        <TaskCard
                                            key={tarea.id}
                                            task={{
                                                title: tarea.titulo,
                                                description: tarea.descripcion,
                                                dueDate: tarea.fechaLimite,
                                                status: tarea.estado as "pendiente" | "backlog" | "en_progreso" | "completado",
                                                id: Number(tarea.id) ?? 0
                                            }}
                                        />
                                    ))}
                            </div>
                            <div className="column enProgreso">
                                <h4>En progreso</h4>
                                {selectedSprint?.tareas
                                    ?.filter((tarea) => tarea.estado === "en_progreso")
                                    .map((tarea) => (
                                        <TaskCard
                                            key={tarea.id}
                                            task={{
                                                title: tarea.titulo,
                                                description: tarea.descripcion,
                                                dueDate: tarea.fechaLimite,
                                                status: tarea.estado as "pendiente" | "backlog" | "en_progreso" | "completado",
                                                id: Number(tarea.id) ?? 0
                                            }}
                                        />
                                    ))}
                            </div>
                            <div className="column completado">
                                <h4>Completado</h4>
                                {selectedSprint?.tareas
                                    ?.filter((tarea) => tarea.estado === "completado")
                                    .map((tarea) => (
                                        <TaskCard
                                            key={tarea.id}
                                            task={{
                                                title: tarea.titulo,
                                                description: tarea.descripcion,
                                                dueDate: tarea.fechaLimite,
                                                status: tarea.estado as "pendiente" | "backlog" | "en_progreso" | "completado",
                                                id: Number(tarea.id) ?? 0
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Selecciona una Sprint para ver los detalles.</p>
                )}
            </div>
            {openCrearTareaModal && selectedSprint && (
                <CrearTareaModal
                    modalClass="formularioModal nuevaClase"
                    handleCloseCrearTareaModal={() => setOpenCrearTareaModal(false)}
                    sprintId={selectedSprint.id}
                />
            )}
            {openModal === 'verTarea' && (
                <VerTareaModal
                    modalClass="verModal nuevaClase"
                    handleCloseVerTareaModal={() => setOpenModal(null)}
                />
            )}
            {openModal === 'editarTarea' && (
                <CrearTareaModal
                    modalClass="formularioModal nuevaClase"
                    handleCloseCrearTareaModal={() => setOpenModal(null)}
                    sprintId={selectedSprint?.id}
                />
            )}
        </>
    );
}