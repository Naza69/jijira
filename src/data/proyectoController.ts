import axios from "axios";
import { ITarea } from "../types/ITarea";
import {API_URL} from '../utils/constants'
import { backlogPut } from "../http/backlogPut";
import Swal from "sweetalert2"

export const getTareaController = async (): Promise<ITarea[]> => {
    try {
        const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
        return response.data.tareas

    } catch (error) {
        console.error("Ocurrio un error con getTareaController", error)
        return [];
    }

}

export const createTareaController = async (newTarea: ITarea) => {
	try {
		const tareaDB = await getTareaController();
		if (tareaDB) {
			await backlogPut([...tareaDB, newTarea]);
		} else {
			await backlogPut([newTarea]);
		}

		return newTarea;
	} catch (error) {
		console.error("Ocurrio un error en createTareaController:", error);
	}
};

export const updateTareaController = async (updatedTarea: ITarea) => {
	try {
		const tareasDB = await getTareaController();
		if (tareasDB) {
			const result = tareasDB.map((tareasDB) =>
				tareasDB.id === updatedTarea.id ? { ...tareasDB, ...updatedTarea } : tareasDB
			);
			await backlogPut(result);
		}
	} catch (error) {
		console.error("Error en updateTareaController:", error);
	}
};

export const deleteTareaController = async (idDeletedTarea: string) => {
	try {
		const tareasDB = await getTareaController()
		if(tareasDB) {
			const updatedTareas = tareasDB.filter((tarea) => tarea.id !== idDeletedTarea)
			await backlogPut(updatedTareas)
		}
		

	} catch (error) {
		console.error("Error en deleteTareaController", error)
	}
}
