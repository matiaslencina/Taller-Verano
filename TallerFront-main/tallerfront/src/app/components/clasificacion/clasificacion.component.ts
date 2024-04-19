import { Component, OnInit } from '@angular/core';
import { ClasificacionService } from 'src/app/services/clasificacion.service';
import { ClasificacionDTO } from './clasificacion.model';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {
  clasificaciones: ClasificacionDTO[] = [];
  nuevaClasificacion: ClasificacionDTO;

  constructor(private clasificacionService: ClasificacionService, private authService: AuthService) {
    this.nuevaClasificacion = this.inicializarNuevaClasificacion();
  }

  ngOnInit(): void {
    this.getClasificaciones();
  }

  inicializarNuevaClasificacion(): ClasificacionDTO {
    return {
      id: 0,
      competidor: {
        id: 0, nombre: '', colores: '', trofeos: '',
        fecha_baja: undefined
      },
      competencia: { id: 0, nombre: '', fecha_inicio: '', fecha_creacion: '', fecha_baja: null },
      numeroGanados: 0,
      numeroEmpatados: 0,
      numeroPerdidos: 0,
      fechaBaja: null
    };
  }

  getClasificaciones(): void {
    this.clasificacionService.getClasificaciones()
      .subscribe(
        clasificaciones => this.clasificaciones = clasificaciones,
        error => console.error('Error al obtener las clasificaciones:', error)
      );
  }

  crearClasificacion(): void {
    this.clasificacionService.createClasificacion(this.nuevaClasificacion)
      .pipe(
        catchError(error => {
          console.error('Error al crear la clasificación:', error);
          return throwError(error);
        })
      )
      .subscribe(
        clasificacion => {
          this.clasificaciones.push(clasificacion);
          this.nuevaClasificacion = this.inicializarNuevaClasificacion();
        }
      );
  }

  actualizarClasificacion(clasificacion: ClasificacionDTO): void {
    this.clasificacionService.updateClasificacion(clasificacion.id, clasificacion)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar la clasificación:', error);
          return throwError(error);
        })
      )
      .subscribe(
        updatedClasificacion => {
          const index = this.clasificaciones.findIndex(c => c.id === updatedClasificacion.id);
          if (index !== -1) {
            this.clasificaciones[index] = updatedClasificacion;
          }
        }
      );
  }

  eliminarClasificacion(id: number): void {
    this.clasificacionService.deleteClasificacion(id)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar la clasificación:', error);
          return throwError(error);
        })
      )
      .subscribe(
        () => {
          this.clasificaciones = this.clasificaciones.filter(c => c.id !== id);
        }
      );
  }

  logout() {
    this.authService.logout();
  }
}
