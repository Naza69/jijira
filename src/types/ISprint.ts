import { ITarea } from "./ITarea"

export interface ISprint {
    "id": string,
    "fechaInicio": Date,
    "fechaCierre": Date,
    "nombre": string,
    "tareas": ITarea[]
}