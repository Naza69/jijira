import { create } from 'zustand';
import { ISprint } from '../types/ISprint';
import { ITarea } from '../types/ITarea';

export type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'pendiente' | 'backlog' | 'en progreso' | 'completado';
};

export type AppState = {
    // Modal management
    openModal: string | null;
    setOpenModal: (modalName: string | null) => void;

    // Sprint management
    sprints: ISprint[];
    addSprint: (sprint: ISprint) => void;
    updateSprint: (updatedSprint: ISprint) => void;
    selectedSprint: ISprint | null;
    setSelectedSprint: (sprint: ISprint | null) => void;
    removeSprint: (sprintId: string) => void;

    // Task management
    tareas: ITarea[];
    activeTarea: ITarea | null;
    setActiveTarea: (tarea: ITarea | null) => void;
    setArrayTareas: (arrayDeTareas: ITarea[]) => void;
    addNewTarea: (tarea: ITarea) => void;
    editTarea: (updatedTarea: ITarea) => void;
    deleteTarea: (idTarea: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
    // Modal management
    openModal: null,
    setOpenModal: (modalName) => set({ openModal: modalName }),

    // Sprint management
    sprints: [],
    addSprint: (sprint) =>
        set((state) => ({
            sprints: [...state.sprints, sprint],
        })),
    updateSprint: (updatedSprint) =>
        set((state) => ({
            sprints: state.sprints.map((sprint) =>
                sprint.id === updatedSprint.id ? updatedSprint : sprint
            ),
        })),
    selectedSprint: null,
    setSelectedSprint: (sprint) => set({ selectedSprint: sprint }),
    removeSprint: (sprintId) =>
        set((state) => ({
            sprints: state.sprints.filter((sprint) => sprint.id !== sprintId),
        })),

    // Task management
    tareas: [],
    activeTarea: null,
    setActiveTarea: (tarea) => set(() => ({ activeTarea: tarea })),
    setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),
    addNewTarea: (newTarea) =>
        set((state) => ({ tareas: [...state.tareas, newTarea] })),
    editTarea: (editedTarea) =>
        set((state) => ({
            tareas: state.tareas.map((tarea) =>
                tarea.id === editedTarea.id ? { ...tarea, ...editedTarea } : tarea
            ),
        })),
    deleteTarea: (idTarea) =>
        set((state) => ({
            tareas: state.tareas.filter((tarea) => tarea.id !== idTarea),
        })),
}));

