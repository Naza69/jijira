import axios from "axios";
import { ISprint } from "../types/ISprint";
import { API_URL } from "../utils/constants";

export const SprintPut = async (updatedSprint: ISprint) => {
    try {
        // Obtiene la lista actual de sprints del servidor
        const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
        const sprints = response.data.sprints || [];

        // Actualiza solo el sprint afectado
        const updatedSprints = sprints.map((sprint) =>
            sprint.id === updatedSprint.id ? updatedSprint : sprint
        );

        // Envía la lista actualizada al servidor
        await axios.put(`${API_URL}/sprintList`, { sprints: updatedSprints });
        console.log("Sprint actualizado en el servidor:", updatedSprint);
    } catch (error) {
        console.error("Algo salió mal en SprintPut:", error);
        throw error;
    }
};