import axios from "axios";
import { ITarea } from "../types/ITarea";
import { API_URL } from '../utils/constants';
import { backlogPut } from "../http/backlogPut";
import Swal from "sweetalert2";
import { ISprint } from "../types/ISprint";

export const getTareaController = async (): Promise<ITarea[]> => {
	try {
		const response = await axios.get<ITarea[]>(`${API_URL}/tareas`);
		return response.data || []; // Devuelve un array vacío si no hay tareas
	} catch (error) {
		console.error("Ocurrió un error con getTareaController:", error);
		return [];
	}
};

export const createTareaController = async (newTarea: ITarea) => {
	try {
		const response = await axios.post<ITarea>(`${API_URL}/tareas`, newTarea);
		return response.data;
	} catch (error) {
		console.error("Ocurrió un error en createTareaController:", error);
		throw error;
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
		// Realiza una solicitud DELETE al servidor para eliminar la tarea
		await axios.delete(`${API_URL}/tareas/${idDeletedTarea}`);
	} catch (error) {
		console.error("Error en deleteTareaController:", error);
		throw error; // Lanza el error para manejarlo en el nivel superior si es necesario
	}
};

export const getSprintController = async (): Promise<ISprint[]> => {
	try {
		const response = await axios.get<ISprint[]>(`${API_URL}/sprints`);
		return response.data || []; // Devuelve un array vacío si no hay sprints
	} catch (error) {
		console.error("Ocurrió un error con getSprintController:", error);
		return [];
	}
};

export const createSprintController = async (newSprint: ISprint) => {
	try {
		const response = await axios.post<{ sprints: ISprint[] }>(`${API_URL}/sprints`, newSprint);
		return response.data;
	} catch (error) {
		console.error("Ocurrió un error en createSprintController:", error);
		throw error;
	}
};

export const updateSprintController = async (updatedSprint: ISprint) => {
	try {
		const response = await axios.put(`${API_URL}/sprints/${updatedSprint.id}`, updatedSprint);
		return response.data;
	} catch (error) {
		console.error("Ocurrió un error en updateSprintController:", error);
		throw error;
	}
};

export const deleteSprintController = async (idSprintToDelete: string) => {
	try {
		const response = await axios.delete(`${API_URL}/sprints/${idSprintToDelete}`);
		return response.data;
	} catch (error) {
		console.error("Ocurrió un error en deleteSprintController:", error);
		throw error;
	}
};