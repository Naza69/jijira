import styles from "./Backlog.module.css"
import { CardTarea } from '../ui/cardTarea/CardTarea'
import { useTarea } from "../hooks/useTarea"
import { CrearTareaModal } from "../ui/modals/CrearTareaModal/CrearTareaModal"
import { ListTarea } from "../ui/ListTarea/ListTarea"

export const Backlog = () => {
  return (
    <div>    
        <ListTarea />
    </div>
  )
}
