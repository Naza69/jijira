import styles from './CardTarea.module.css'
import { ITarea } from '../../../types/ITarea'
import { FC } from 'react'
import { useTarea } from '../../hooks/useTarea'

type CardTareaProps = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void
  handleOpenModalView: (tarea: ITarea) => void
}


export const CardTarea: FC<CardTareaProps> = ({ tarea, handleOpenModalEdit, handleOpenModalView }) => {
  const { deleteExistingTarea } = useTarea()
  const { updateExistingTarea } = useTarea()

  const handleDeleteTarea = () => {
    deleteExistingTarea(tarea.id!)
  }

  const handleEditTarea = () => {
    handleOpenModalEdit(tarea)
  }

  const handleVerTarea = () => {
    handleOpenModalView(tarea)
  }


  return (
    <div className={styles.cardElemContainer}>
      <div>
          <p>{tarea.titulo}</p>
          <p>{tarea.descripcion}</p>
          <p>{tarea.fechaLimite}</p>

      </div>
      <div>
        <button>Agregar a</button>
        <select name="" id=""></select>
        <button onClick={handleVerTarea}>O</button>
        <button onClick={handleEditTarea}>I</button>
        <button onClick={handleDeleteTarea}>E</button>
      </div>
    </div>
  )
}
