import React, { useState } from 'react';
import { useAppStore } from '../../../../store/store';
import { ISprint } from '../../../../types/ISprint';
import styles from "../CrearTareaModal/CrearTareaModal.module.css";
import Button from 'react-bootstrap/Button';

export const CrearSprintModal = ({ modalClass, onClose }: { modalClass: string; onClose: () => void }) => {
    const addSprint = useAppStore((state) => state.addSprint);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = () => {
        if (title && description && startDate && endDate) {
            const newSprint: ISprint = {
                id: Date.now().toString(),
                title,
                description,
                startDate,
                endDate,
            };
            addSprint(newSprint);
            onClose();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <form className={`${styles.formularioModal} ${modalClass}`} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className='tituloModal'>
                <h2>Crear Sprint</h2>
            </div>
            <div className='tituloNombreModal inputFormulario'>
                <label htmlFor="nombreSprint">Titulo: </label>
                <input
                    type="text"
                    id="nombreSprint"
                    name="nombreSprint"
                    required
                    placeholder='Titulo ejemplo'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='descripcionModal inputFormulario'>
                <label htmlFor="descripcionSprint">Descripción: </label>
                <textarea
                    id="descripcionSprint"
                    name="descripcionSprint"
                    required
                    placeholder='Descripcion ejemplo'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='fechaInicioModal inputFormulario'>
                <label htmlFor="fechaInicioSprint">Fecha Inicio: </label>
                <input
                    type="date"
                    id="fechaInicioSprint"
                    name="fechaInicioSprint"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className='fechaLimiteModal inputFormulario'>
                <label htmlFor="fechaLimiteSprint">Fecha Limite: </label>
                <input
                    type="date"
                    id="fechaLimiteSprint"
                    name="fechaLimiteSprint"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className="botonesModal">
                <Button variant="danger" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="success" type="submit">Guardar</Button>
            </div>
        </form>
    );
};