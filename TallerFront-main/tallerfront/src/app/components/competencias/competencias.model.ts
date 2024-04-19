
import { Participante } from "../participantes/participantes.model";
export interface Usuario {
  id: number;
}

export interface Competencia {
  id: number;
  nombre: string;
  estado?: string;
  fecha_inicio: string;
  fecha_creacion: string;
  fecha_baja: string | null;
  usuario?: Usuario | undefined; // Modificar aquí
  participantes: Participante[]; 

}

