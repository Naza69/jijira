import axios from "axios";
import { ITarea } from "../types/ITarea"
import { IBacklog } from "../types/IBacklog";
import { API_URL } from "../utils/constants"

export const backlogPut = async (tareas: ITarea[]) => {
    try {
        await axios.put(`${API_URL}/backlog`, { tareas }); // Actualiza todo el backlog en el servidor
        console.log("Backlog actualizado en el servidor:", tareas);
    } catch (error) {
        console.error("Algo salió mal en backlogPut:", error);
        throw error;
    }
};