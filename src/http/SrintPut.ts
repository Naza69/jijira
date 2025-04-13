import axios from "axios";
import { ISprint } from "../types/ISprint";
import { API_URL } from "../utils/constants";

export const SprintPut = async (sprints: ISprint[]) => {
    try {
        const response = await axios.put<ISprint[]>(`${API_URL}/sprints`, sprints); // Cambiar el cuerpo de la solicitud
        return response.data;
    } catch (error) {
        console.error("Algo salió mal SprintPut:", error);
        throw error;
    }
};