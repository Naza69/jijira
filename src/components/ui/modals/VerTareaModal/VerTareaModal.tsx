import React, { act, FC } from 'react'
import styles from "./VerTareaModal.module.css"
import { ITarea } from '../../../../types/ITarea';
import { TareaStore } from '../../../../store/TareaStore';
import { Button } from 'react-bootstrap';

type VerTareaModalProps = {
    modalClass: string;
    handleCloseVerTareaModal: () => void;
};

const initialState: ITarea = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    estado: ""
};


export const VerTareaModal : FC<VerTareaModalProps> = ({ modalClass, handleCloseVerTareaModal }) => {
  const activeTarea = TareaStore((state) => state.activeTarea);
	const setActiveTask = TareaStore((state) => state.setActiveTarea);

	const handleClose = () => {
		setActiveTask(null);
		handleCloseVerTareaModal(); };

  return (
    <>
        <div className={`${styles.containerModal} ${modalClass}`} >
            
                <div className={styles.tituloModal}>
                    <h2>{activeTarea?.titulo}</h2>
                </div>
                <div className={styles.inputFormulario}>
                    <p >{activeTarea?.descripcion} </p>

                </div>
                <div className={styles.inputFormulario}>
                    <p >{activeTarea?.fechaLimite}</p>

                </div>
                <div className={styles.botonesModal}>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                </div>
        </div>
    </>
  )
}
