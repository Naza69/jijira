import React, { useState } from 'react';
import './CrearTareaModalEstilo.css';
import Button from 'react-bootstrap/Button';
import { useAppStore } from '../../../store/store';

export const CrearTareaModal = ({ modalClass, onClose }: { modalClass: string; onClose: () => void }) => {
    const addTask = useAppStore((state) => state.addTask);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSave = () => {
        if (title && description && dueDate) {
            const newTask = {
                id: Date.now(),
                title,
                description,
                dueDate,
                status: 'pendiente',
            };
            addTask(newTask);
            onClose();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <form className={modalClass}>
            <div className="tituloModal">
                <h2>Crear Tarea</h2>
            </div>
            <div className="tituloNombreModal inputFormulario">
                <label htmlFor="nombreTarea">Titulo: </label>
                <input
                    type="text"
                    id="nombreTarea"
                    name="nombreTarea"
                    required
                    placeholder="Titulo ejemplo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="descripcionModal inputFormulario">
                <label htmlFor="descripcionTarea">Descripción: </label>
                <textarea
                    id="descripcionTarea"
                    name="descripcionTarea"
                    required
                    placeholder="Descripcion ejemplo"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="fechaLimiteModal inputFormulario">
                <label htmlFor="fechaLimiteTarea">Fecha Limite: </label>
                <input
                    type="date"
                    id="fechaLimiteTarea"
                    name="fechaLimiteTarea"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
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