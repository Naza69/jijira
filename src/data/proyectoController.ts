import axios from "axios";
import { ITarea } from "../types/ITarea";
import { API_URL } from '../utils/constants';
import { ISprint } from "../types/ISprint";

export const getTareaController = async (): Promise<ITarea[]> => {
	try {
		const response = await axios.get<{ tareas: ITarea[] }>(`${API_URL}/backlog`);
		return response.data.tareas || []; // Devuelve las tareas del backlog
	} catch (error) {
		console.error("Error en getTareaController:", error);
		throw new Error("No se pudieron obtener las tareas del backlog.");
	}
};

export const createTareaController = async (newTarea: ITarea): Promise<ITarea> => {
	try {
		const response = await axios.get<{ tareas: ITarea[] }>(`${API_URL}/backlog`);
		const tareas = response.data.tareas || [];
		const updatedTareas = [...tareas, newTarea];
		await axios.put(`${API_URL}/backlog`, { tareas: updatedTareas }); // Actualizamos todo el backlog
		return newTarea;
	} catch (error) {
		console.error("Error en createTareaController:", error);
		throw new Error("No se pudo crear la tarea.");
	}
};

export const updateTareaController = async (updatedTarea: ITarea): Promise<void> => {
	try {
		const response = await axios.get<{ tareas: ITarea[] }>(`${API_URL}/backlog`);
		const tareas = response.data.tareas || [];
		const updatedTareas = tareas.map((tarea) =>
			tarea.id === updatedTarea.id ? updatedTarea : tarea
		);
		await axios.put(`${API_URL}/backlog`, { tareas: updatedTareas }); // Actualizamos todo el backlog
	} catch (error) {
		console.error("Error en updateTareaController:", error);
		throw new Error("No se pudo actualizar la tarea.");
	}
};

export const deleteTareaController = async (idDeletedTarea: string): Promise<void> => {
	try {
		const response = await axios.get<{ tareas: ITarea[] }>(`${API_URL}/backlog`);
		const tareas = response.data.tareas || [];
		const updatedTareas = tareas.filter((tarea) => tarea.id !== idDeletedTarea);
		await axios.put(`${API_URL}/backlog`, { tareas: updatedTareas }); // Actualizamos todo el backlog
	} catch (error) {
		console.error("Error en deleteTareaController:", error);
		throw new Error("No se pudo eliminar la tarea.");
	}
};

export const getSprintController = async (): Promise<ISprint[]> => {
	try {
		const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
		return response.data.sprints || []; // Devuelve los sprints
	} catch (error) {
		console.error("Error en getSprintController:", error);
		throw new Error("No se pudieron obtener los sprints.");
	}
};

export const createSprintController = async (newSprint: ISprint): Promise<ISprint> => {
	try {
		const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
		const sprints = response.data.sprints || [];
		const updatedSprints = [...sprints, newSprint];
		await axios.put(`${API_URL}/sprintList`, { sprints: updatedSprints }); // Actualizamos toda la lista de sprints
		return newSprint;
	} catch (error) {
		console.error("Error en createSprintController:", error);
		throw new Error("No se pudo crear el sprint.");
	}
};

export const updateSprintController = async (updatedSprint: ISprint): Promise<void> => {
	try {
		const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
		const sprints = response.data.sprints || [];
		const updatedSprints = sprints.map((sprint) =>
			sprint.id === updatedSprint.id ? updatedSprint : sprint
		);
		await axios.put(`${API_URL}/sprintList`, { sprints: updatedSprints }); // Actualizamos toda la lista de sprints
	} catch (error) {
		console.error("Error en updateSprintController:", error);
		throw new Error("No se pudo actualizar el sprint.");
	}
};

export const deleteSprintController = async (idSprintToDelete: string): Promise<void> => {
	try {
		const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
		const sprints = response.data.sprints || [];
		const updatedSprints = sprints.filter((sprint) => sprint.id !== idSprintToDelete);
		await axios.put(`${API_URL}/sprintList`, { sprints: updatedSprints }); // Actualizamos toda la lista de sprints
	} catch (error) {
		console.error("Error en deleteSprintController:", error);
		throw new Error("No se pudo eliminar el sprint.");
	}
};

export const updateTareaInSprintController = async (sprintId: string, updatedTarea: ITarea): Promise<void> => {
	try {
		const response = await axios.get<{ sprints: ISprint[] }>(`${API_URL}/sprintList`);
		const sprints = response.data.sprints || [];
		const updatedSprints = sprints.map((sprint) => {
			if (sprint.id === sprintId) {
				return {
					...sprint,
					tareas: sprint.tareas.map((tarea) =>
						tarea.id === updatedTarea.id ? updatedTarea : tarea
					),
				};
			}
			return sprint;
		});
		await axios.put(`${API_URL}/sprintList`, { sprints: updatedSprints });
	} catch (error) {
		console.error("Error en updateTareaInSprintController:", error);
		throw new Error("No se pudo actualizar la tarea en el sprint.");
	}
};