import React, { useState, useEffect } from 'react';
import '../CrearTarea/CrearTareaModalEstilo.css';
import Button from 'react-bootstrap/Button';
import { useAppStore } from '../../../store/store';

export const EditarTareaModal = ({ modalClass, onClose }: { modalClass: string; onClose: () => void }) => {
    const selectedSprint = useAppStore((state) => state.selectedSprint); // Sprint seleccionado
    const updateSprint = useAppStore((state) => state.updateSprint); // Acción para actualizar el sprint

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Cargar los datos del sprint seleccionado en los inputs
    useEffect(() => {
        if (selectedSprint) {
            setTitle(selectedSprint.title);
            setDescription(selectedSprint.description);
            setStartDate(selectedSprint.startDate);
            setEndDate(selectedSprint.endDate);
        }
    }, [selectedSprint]);

    const handleSave = () => {
        if (selectedSprint) {
            const updatedSprint = {
                ...selectedSprint,
                title,
                description,
                startDate,
                endDate,
            };
            updateSprint(updatedSprint); // Actualiza el sprint en el store
            onClose(); // Cierra el modal
        }
    };

    return (
        <form className={`formularioModal ${modalClass}`}>
            <div className="tituloModal">
                <h2>Editar Sprint</h2>
            </div>
            <div className="tituloNombreModal inputFormulario">
                <label htmlFor="nombreSprint">Título:</label>
                <input
                    type="text"
                    id="nombreSprint"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="descripcionModal inputFormulario">
                <label htmlFor="descripcionSprint">Descripción:</label>
                <textarea
                    id="descripcionSprint"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="fechaInicioModal inputFormulario">
                <label htmlFor="startDate">Fecha de Inicio:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="fechaLimiteModal inputFormulario">
                <label htmlFor="endDate">Fecha de Fin:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className="botonesModal">
                <Button variant="danger" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleSave}>
                    Guardar
                </Button>
            </div>
        </form>
    );
};
