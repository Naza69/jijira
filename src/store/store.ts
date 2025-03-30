import { create } from 'zustand';
import { ISprint } from '../components/types/ISprint';

export type AppState = {
    openModal: string | null;
    setOpenModal: (modalName: string | null) => void;
    sprints: ISprint[];
    addSprint: (sprint: ISprint) => void;
    updateSprint: (updatedSprint: ISprint) => void; // Acción para actualizar un sprint
    selectedSprint: ISprint | null;
    setSelectedSprint: (sprint: ISprint | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
    openModal: null,
    setOpenModal: (modalName) => set({ openModal: modalName }),
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
        })), // Actualiza el sprint en la lista
    selectedSprint: null,
    setSelectedSprint: (sprint) => set({ selectedSprint: sprint }),
}));