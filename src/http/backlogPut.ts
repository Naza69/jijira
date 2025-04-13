import axios from "axios";
import { ITarea } from "../types/ITarea"
import { IBacklog } from "../types/IBacklog";
import { API_URL } from "../utils/constants"

export const backlogPut = async (tareas: ITarea[]) => {
    try {
        const updateRequests = tareas.map((tarea) =>
            axios.put(`${API_URL}/tareas/${tarea.id}`, tarea)
        );

        await Promise.all(updateRequests);
    } catch (error) {
        console.error("Algo salió mal en backlogPut:", error);
    }
};