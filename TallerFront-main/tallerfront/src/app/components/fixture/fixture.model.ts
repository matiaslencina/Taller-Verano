import { Resultado } from "../resultado/resultado.model";
export interface Enfrentamiento {
    participante: string;
    oponente: string;
    competencia: string;
    fechaPartido: string;
    enfrentamientos: Enfrentamiento[];
    resultado?: Resultado;
  }
  