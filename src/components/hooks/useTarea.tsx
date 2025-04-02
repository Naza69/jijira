import { TareaStore } from "../../store/TareaStore"
import { createTareaController, getTareaController, updateTareaController, deleteTareaController } from "../../data/proyectoController"
import { ITarea } from "../../types/ITarea"
import { useShallow } from "zustand/shallow"
import Swal from "sweetalert2"

export const useTarea = () => {

    const { tareas, setArrayTareas, addNewTarea, deleteTarea, editTarea } = TareaStore(
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
    const updateExistingTarea = async (updatedTarea: ITarea) => {
        const previuosTarea = tareas.find((el) => el.id === updatedTarea.id)
        if (previuosTarea) {
            editTarea(updatedTarea)
            try {
                await updateTareaController(updatedTarea);

            } catch (error) {
                editTarea(previuosTarea)
                console.error("Error en updateExistingTarea", error)
            }
        }
    }

    const deleteExistingTarea = async (idTareaToDelete: string) => {
        const previuosTarea = tareas.find((tarea) => tarea.id === idTareaToDelete)

        Swal.fire({
            title: "Are fucking sure bruh?",
            text: "Posta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#193888d",
            cancelButtonColor: "#09398hg",
            confirmButtonText: "Nismearlo",
            cancelButtonText: "Achicarse"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (previuosTarea) {
                    deleteTarea(idTareaToDelete)
                    try {
                        await deleteTareaController(idTareaToDelete);

                    } catch (error) {
                        addTarea(previuosTarea)
                        console.error("Hubo un error en deleteExistingTarea", error)
                    }
                }
                //Esto creo que esta mal, avisa que fue eliminada la tarea aun si el try dio error
                Swal.fire({
                    title: "Eliminado!",
                    text: "Tu tarea fue eliminada.",
                    icon: "success",
                });
            }

        })
    }
    return {
        tareas,
        getTareas,
        addTarea,
        updateExistingTarea,
        deleteExistingTarea
    }
}