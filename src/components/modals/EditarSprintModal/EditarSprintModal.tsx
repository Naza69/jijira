import React from 'react'
import '../CrearTarea/CrearTareaModalEstilo.css';
import Button from 'react-bootstrap/Button';
export const EditarSprintModal = ({ modalClass, onClose }: { modalClass: string; onClose: () => void }) => {
    const modalClassName = `modal ${modalClass}`;
    return (
        <>
            <form className={`formularioModal ${modalClassName}`}>
                <div className='tituloModal'>
                    <h2>Editar Sprint</h2>
                </div>
                <div className='tituloNombreModal inputFormulario'>
                    <label htmlFor="nombreSprint ">Titulo: </label>
                    <input type="text" id="nombreSprint" name="nombreSprint" required placeholder='Titulo ejemplo' />
                </div>
                <div className='descripcionModal inputFormulario'>
                    <label htmlFor="descripcionSprint">Descripción: </label>
                    <textarea id="descripcionSprint" name="descripcionSprint" required placeholder='Descripcion ejemplo' />
                </div>
                <div className='fechaLimiteModal inputFormulario'>
                    <label htmlFor="fechaLimiteSprint">Fecha Limite: </label>
                    <input type="date" id="fechaLimiteSprint" name="fechaLimiteSprint" required />
                </div>
                <div className='botonesModal'>
                    <Button variant="danger" onClick={onClose}>Cancelar</Button>
                    <Button variant="success">Guardar</Button>
                </div>
            </form>
        </>
    )
}
