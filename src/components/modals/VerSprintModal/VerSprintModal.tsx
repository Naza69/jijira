import React from 'react';
import '../CrearTarea/CrearTareaModalEstilo.css';
import Button from 'react-bootstrap/Button';
import { ISprint } from '../../types/ISprint';

export const VerSprintModal = ({ sprint, onClose }: { sprint: ISprint; onClose: () => void }) => {
    return (
        <div className="formularioModal">
            <div className="tituloModal">
                <h2>Detalles del Sprint</h2>
            </div>
            <div className="tituloNombreModal inputFormulario">
                <label>Título:</label>
                <p>{sprint.title}</p>
            </div>
            <div className="descripcionModal inputFormulario">
                <label>Descripción:</label>
                <p>{sprint.description}</p>
            </div>
            <div className="fechaInicioModal inputFormulario">
                <label>Fecha de Inicio:</label>
                <p>{sprint.startDate}</p>
            </div>
            <div className="fechaLimiteModal inputFormulario">
                <label>Fecha de Fin:</label>
                <p>{sprint.endDate}</p>
            </div>
            <div className="botonesModal">
                <Button variant="danger" onClick={onClose}>
                    Cerrar
                </Button>
            </div>
        </div>
    );
};
