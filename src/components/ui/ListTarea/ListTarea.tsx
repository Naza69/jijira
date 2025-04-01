import React from 'react'
import { CrearTareaModal } from '../modals/CrearTareaModal/CrearTareaModal'
import { ITarea } from '../../../types/ITarea'
import { TareaStore } from '../../../store/TareaStore'
import { useEffect, useState } from 'react'
import { useTarea } from '../../hooks/useTarea'
import { CardTarea } from '../cardTarea/CardTarea'

export const ListTarea = () => {
    const setActiveTarea = TareaStore((state) => state.setActiveTarea)    
    const {getTareas} = useTarea(); 
    const {tareas} = useTarea();


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
    return ( 
        <div >
            <div>
                <div >
                    <div >Backlog</div>
                    <button onClick={() => {setOpenModalTarea(true)}}>Crear tarea</button>
                    <button >Tareas</button>
                </div> 
            <div>Tareas en el backlog</div>
        </div>
            {tareas.length > 0 ? (
                tareas.map((el) => (
                    <CardTarea tarea={el} 
                        key={el.id}
                    />
                ))
            ) : (
                <div>
                    <h3>No hay tareas loco</h3>
                </div>
            )} 
            {openModalTarea && (
				<CrearTareaModal modalClass="formularioModal nuevaClase" handleCloseCrearTareaModal={handleCloseCrearTareaModal} />
			)}
        </div>
    )
}
