import { createContext } from "react";
import { Patentes, registrosProps } from "./components/CustomTable";

export interface Fuente {
	id: number;
	title: string;
	organization: string;
	frequency: number;
	is_monitoring: boolean;
	editores: string;
	materia: string;
	url: string;
	id_eje: number;
}
interface Eje {
	id_eje: number;
	nombre_eje: string;
	esta_activo: boolean;
}

export type ContextObservatory = {
	registros: registrosProps[];
	patentes: Patentes[];
	fuentes: Fuente[];
	ejes: Eje[];
};

export type DataFetched = {
	data: ContextObservatory | null;
	error: null | unknown;
};

const initialState: ContextObservatory = {
	registros: [],
	patentes: [],
	fuentes: [],
	ejes: [],
};

export const observatory = createContext(initialState);
