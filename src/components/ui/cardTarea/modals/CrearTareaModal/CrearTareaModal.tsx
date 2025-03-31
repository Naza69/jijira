import React from 'react';
import './CrearTareaModalEstilo.css';
import Button from 'react-bootstrap/Button';

export const CrearTareaModal = ({ modalClass, onClose }: { modalClass: string; onClose: () => void }) => {
    return (
        <>
            <form className={modalClass}>
                <div className="tituloModal">
                    <h2>Crear Tarea</h2>
                </div>
                <div className="tituloNombreModal inputFormulario">
                    <label htmlFor="nombreTarea">Titulo: </label>
                    <input type="text" id="nombreTarea" name="nombreTarea" required placeholder="Titulo ejemplo" />
                </div>
                <div className="descripcionModal inputFormulario">
                    <label htmlFor="descripcionTarea">Descripción: </label>
                    <textarea id="descripcionTarea" name="descripcionTarea" required placeholder="Descripcion ejemplo" />
                </div>
                <div className="fechaLimiteModal inputFormulario">
                    <label htmlFor="fechaLimiteTarea">Fecha Limite: </label>
                    <input type="date" id="fechaLimiteTarea" name="fechaLimiteTarea" required />
                </div>
                <div className="botonesModal">
                    <Button variant="danger" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="success">Guardar</Button>
                </div>
            </form>
        </>
    );
};