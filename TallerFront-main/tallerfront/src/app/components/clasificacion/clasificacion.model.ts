import { Participante } from "../participantes/participantes.model";
import { Competencia } from "../competencias/competencias.model";
import { CompetenciaDTO } from "../dtos/competenciasDTO";

export interface ClasificacionDTO {
  id: number;
  competidor: Participante; 
  competencia: CompetenciaDTO; 
  numeroGanados: number;
  numeroEmpatados: number;
  numeroPerdidos: number;
  fechaBaja: null;
}

export interface Clasificacion {
  id: number;
  competidor: Participante; 
  competencia: CompetenciaDTO; 
  numeroGanados: number;
  numeroEmpatados: number;
  numeroPerdidos: number;
  fechaBaja: null;
}

