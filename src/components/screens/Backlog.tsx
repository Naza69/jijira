import styles from "./Backlog.module.css"
import { CardTarea } from '../ui/cardTarea/CardTarea'
import { useTarea } from "../hooks/useTarea"
import { CrearTareaModal } from "../ui/modals/CrearTareaModal/CrearTareaModal"
import { ListTarea } from "../ui/ListTarea/ListTarea"
import { useNavigate } from 'react-router-dom'

export const Backlog = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Pantalla Backlog</h1>
      <button onClick={() => navigate('/nueva-pantalla')}>Ir a Nueva Pantalla</button>
      <ListTarea />
    </div>
  )
}
