import React from 'react'
import { CrearTareaModal } from '../modals/CrearTareaModal/CrearTareaModal'
import { ITarea } from '../../../types/ITarea'
import { TareaStore } from '../../../store/TareaStore'
import { useEffect, useState } from 'react'
import { useTarea } from '../../hooks/useTarea'
import { CardTarea } from '../cardTarea/CardTarea'
import styles from './ListTarea.module.css';

export const ListTarea = () => {
    const setActiveTarea = TareaStore((state) => state.setActiveTarea)
    const { getTareas } = useTarea();
    const { tareas } = useTarea();


    useEffect(() => {
        getTareas()
    }, [])

    const [openModalTarea, setOpenModalTarea] = useState(false)
    const [openViewModalTask, setOpenViewModalTarea] = useState(false);

    const handleOpenViewTask = (tarea: ITarea) => {
        setActiveTarea(tarea);
        setOpenViewModalTarea(true);
    };

    const handleCloseCrearTareaModal = () => {
        setOpenModalTarea(false)
        setActiveTarea(null)
    }

    const handleOpenModalEdit = (tarea: ITarea) => {
        setActiveTarea(tarea);
        setOpenModalTarea(true);
    };

    return (
        <div className={openModalTarea ? styles.blurredBackground : ''}>
            <div className={styles.ListTareaEstiloGeneral}>
                <div>
                    <div className={styles.tituloBoton}>
                        <div>Backlog</div>
                        <button onClick={() => setOpenModalTarea(true)}>Crear tarea</button>
                    </div>
                    <div>Tareas en el backlog</div>
                </div>
                {tareas.length > 0 ? (
                    tareas.map((el) => (
                        <CardTarea
                            tarea={el}
                            key={el.id}
                            handleOpenModalEdit={handleOpenModalEdit}
                        />
                    ))
                ) : (
                    <div>
                        <h3>No hay tareas</h3>
                    </div>
                )}
                {openModalTarea && (
                    <CrearTareaModal
                        modalClass="formularioModal nuevaClase"
                        handleCloseCrearTareaModal={handleCloseCrearTareaModal}
                    />
                )}
            </div>
        </div>
    )
}
