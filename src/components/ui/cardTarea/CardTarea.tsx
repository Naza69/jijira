import styles from './CardTarea.module.css'
import { ITarea } from '../../../types/ITarea'
import { FC } from 'react'
import { useTarea } from '../../hooks/useTarea'

type CardTareaProps = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void
  //handleOpenView: (tarea: ITarea) => void
}


export const CardTarea: FC<CardTareaProps> = ({ tarea }) => {
  const { deleteExistingTarea } = useTarea()
  const { updateExistingTarea } = useTarea()

  const handleDeleteTarea = () => {
    deleteExistingTarea(tarea.id!)
  }

  const handleEditTarea = () => {
    updateExistingTarea(tarea)
  }

  // const handleViewTarea = () => {
  //   handleOpenView(tarea)
  // }


  return (
    <div className={styles.cardElemContainer}>
      <div>
        <p>
          <p>{tarea.titulo}</p>
          <p>{tarea.descripcion}</p>
          <p>{tarea.fechaLimite}</p>
        </p>

      </div>
      <div>
        <button>Agregar a</button>
        <select name="" id=""></select>
        <button >O</button>
        <button onClick={() => handleEditTarea}>I</button>
        <button onClick={handleDeleteTarea}>E</button>
      </div>
    </div>
  )
}
