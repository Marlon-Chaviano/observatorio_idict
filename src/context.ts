import { createContext } from "react";
import { Patentes, registrosProps } from "./components/CustomTable";

export interface Fuente {
  editores: string;
  frequency: number;
  id: number;
  id_eje: number | string;
  is_monitoring: boolean;
  materia: string;
  organization: string;
  ejeTematico?: string;
  title: string;
  url: string;
}
interface Eje {
  id_eje: number;
  nombre_eje: string;
  esta_activ: boolean;
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
