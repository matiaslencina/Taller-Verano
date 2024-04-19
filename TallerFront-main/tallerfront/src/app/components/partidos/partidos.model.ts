import { Competencia } from "../competencias/competencias.model";
import { Participante } from "../participantes/participantes.model";

export class Partido {
  id?: number;
  goles_local: number = 0;
  goles_visitante: number = 0;
  fecha_realizacion: Date = new Date();
  fecha_baja?: string;
  competencia?: Competencia;
  local?: Participante;
  visitante?: Participante;
  nombreEquipoLocal?: string;
  nombreEquipoVisitante?: string;
  nombreCompetencia?: string;
  
  constructor() {}
}
