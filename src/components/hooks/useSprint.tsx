import { useAppStore } from "../../store/store";
import { getSprintController, createSprintController, updateSprintController, deleteSprintController } from "../../data/proyectoController";
import { ISprint } from "../../types/ISprint";
import { useShallow } from "zustand/shallow";
import Swal from "sweetalert2";

export const useSprint = () => {
    const { sprints, setArraySprints, addSprint, updateSprint, removeSprint } = useAppStore(
        useShallow((state) => ({
            sprints: state.sprints,
            setArraySprints: state.setArraySprints,
            addSprint: state.addSprint,
            updateSprint: state.updateSprint,
            removeSprint: state.removeSprint,
        }))
    );

    const getSprints = async () => {
        const data = await getSprintController();
        if (data) setArraySprints(data);
    };

    const addNewSprint = async (newSprint: ISprint) => {
        addSprint(newSprint);
        try {
            await createSprintController(newSprint);
        } catch (error) {
            removeSprint(newSprint.id);
            console.error("Error en addNewSprint:", error);
        }
    };

    const updateExistingSprint = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id);
        if (previousSprint) {
            updateSprint(updatedSprint);
            try {
                await updateSprintController(updatedSprint);
            } catch (error) {
                updateSprint(previousSprint);
                console.error("Error en updateExistingSprint:", error);
            }
        }
    };

    const deleteExistingSprint = async (idSprintToDelete: string) => {
        const previousSprint = sprints.find((sprint) => sprint.id === idSprintToDelete);

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed && previousSprint) {
                removeSprint(idSprintToDelete);
                try {
                    await deleteSprintController(idSprintToDelete);
                } catch (error) {
                    addSprint(previousSprint);
                    console.error("Error en deleteExistingSprint:", error);
                }
                Swal.fire("Eliminado", "El sprint ha sido eliminado.", "success");
            }
        });
    };

    return {
        sprints,
        getSprints,
        addNewSprint,
        updateExistingSprint,
        deleteExistingSprint,
    };
};