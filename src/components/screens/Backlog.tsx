import styles from "./Backlog.module.css"
import { CardTarea } from '../ui/cardTarea/CardTarea'

export const Backlog = () => {
  return (
    <div>
        <div className={styles.containerBacklog}>
            <div className={styles.containerSubBacklog}>
                  <div className={styles.titleBacklog}>Backlog</div>
                  <button>Crear tarea</button>
            </div> 
            <div>Tareas en el backlog</div>
        </div>
        <div className={styles.cardListContainer}>
            <CardTarea/>
        </div>
    </div>
  )
}
