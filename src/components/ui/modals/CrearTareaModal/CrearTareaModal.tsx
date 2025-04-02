import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from "./CrearTareaModal.module.css"; // Importa el archivo CSS como módulo
import { TareaStore } from '../../../../store/TareaStore';
import { ITarea } from '../../../../types/ITarea';
import Button from 'react-bootstrap/Button';
import { useTarea } from '../../../hooks/useTarea';

type CrearTareaModalProps = {
    modalClass: string;
    handleCloseCrearTareaModal: () => void;
};

const initialState: ITarea = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    estado: ""
};

export const CrearTareaModal: FC<CrearTareaModalProps> = ({ modalClass, handleCloseCrearTareaModal }) => {
    const activeTarea = TareaStore((state) => state.activeTarea);
    const setActiveTarea = TareaStore((state) => state.setActiveTarea);

    const { updateExistingTarea } = useTarea();
    const { addTarea } = useTarea();

    const [formValues, setFormValues] = useState(initialState);

    useEffect(() => {
        if (activeTarea) {
            setFormValues({
                id: activeTarea.id,
                titulo: activeTarea.titulo,
                descripcion: activeTarea.descripcion,
                fechaLimite: activeTarea.fechaLimite,
                estado: activeTarea.estado
            });
        }
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (activeTarea) {
            updateExistingTarea(formValues);
        } else {
            addTarea({ ...formValues, id: crypto.randomUUID() });
        }
        setActiveTarea(null);
        handleCloseCrearTareaModal();
    };

    return (
        <>
            <form className={`${styles.formularioModal} ${modalClass}`} onSubmit={handleSubmit}>
                <div className={styles.tituloModal}>
                    <h2>{activeTarea ? "Editar tarea" : "Crear tarea"}</h2>
                </div>
                <div className={styles.inputFormulario}>
                    <label htmlFor="nombreTarea">Titulo: </label>
                    <input
                        type="text"
                        id="nombreTarea"
                        placeholder="Titulo ejemplo"
                        required
                        value={formValues.titulo}
                        onChange={handleChange}
                        autoComplete="off"
                        name="titulo"
                    />
                </div>
                <div className={styles.inputFormulario}>
                    <label htmlFor="descripcionTarea">Descripción: </label>
                    <textarea
                        id="descripcionTarea"
                        name="descripcion"
                        required
                        placeholder="Descripcion ejemplo"
                        value={formValues.descripcion}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className={styles.inputFormulario}>
                    <label htmlFor="fechaLimiteTarea">Fecha Limite: </label>
                    <input
                        type="date"
                        id="fechaLimiteTarea"
                        name="fechaLimite"
                        required
                        value={formValues.fechaLimite}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.botonesModal}>
                    <Button variant="danger" onClick={handleCloseCrearTareaModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" type="submit">
                        Guardar
                    </Button>
                </div>
            </form>
        </>
    );
};