export class CompetenciaDTO {
  id: number;
  nombre: string = "";
  estado?: string;
  fecha_inicio: string = "";
  fecha_creacion: string = "";
  fecha_baja: null; // Cambiado el tipo de fecha_baja a 'string | null'

  constructor(
    id: number,
    nombre: string,
    estado: string | undefined,
    fecha_inicio: string,
    fecha_creacion: string,
    fecha_baja: null // Modificado para aceptar valores nulos
  ) {
    this.id = id;
    this.nombre = nombre;
    this.estado = estado;
    this.fecha_inicio = fecha_inicio;
    this.fecha_creacion = fecha_creacion;
    this.fecha_baja = fecha_baja;
  }
}
