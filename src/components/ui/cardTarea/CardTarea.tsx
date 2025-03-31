import styles from './CardTarea.module.css'


export const CardTarea = () => {
  return (
    <div className={styles.cardElemContainer}>
        <div>
            <p>
                Titulo
                Descripcion
                FechaLimite
            </p>

        </div>
        <div>
            <button>Agregar a</button>
            <select name="" id=""></select>
            <button >O</button>
            <button>I</button>
            <button>E</button>
        </div>
    </div>
  )
}
 