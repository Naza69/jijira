import { TareaStore } from "../../store/TareaStore"
import { createTareaController, getTareaController } from "../../data/proyectoController"
import { ITarea } from "../../types/ITarea"
import { useShallow } from "zustand/shallow"
import Swal from "sweetalert2"

export const useTarea = () => {

    const {tareas, setArrayTareas, addNewTarea, deleteTarea, editTarea} = TareaStore(
        useShallow((state) => ({
            tareas: state.tareas, 
            setArrayTareas: state.setArrayTareas,
            addNewTarea: state.addNewTarea, 
            editTarea: state.editTarea,
            deleteTarea: state.deleteTarea
             
        }))
    )

    const getTareas = async () => {
            const data = await getTareaController();
            if (data) {
                setArrayTareas(data);
        }
    };

    const addTarea = async (newTarea: ITarea) => {
            addNewTarea(newTarea);
            try {
                await createTareaController(newTarea);
            } catch (error) {
                deleteTarea(newTarea.id!);
                console.error("Error en addNewTask:", error);
            }
    };
}