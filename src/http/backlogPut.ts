import axios from "axios";
import {ITarea} from "../types/ITarea"
import { IBacklog } from "../types/IBacklog";
import {API_URL} from "../utils/constants"

export const backlogPut = async (tarea : ITarea[]) => {
    try{
        const response = await axios.put<IBacklog>(API_URL, {
            tareas: tarea
        });
        return response.data;
    } catch (error) {
        console.error("Algo salio mal backlogPut:", error);
    }
}