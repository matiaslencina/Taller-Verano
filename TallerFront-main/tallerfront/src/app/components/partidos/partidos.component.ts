import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Partido } from './partidos.model';
import { PartidosService } from 'src/app/services/partidos.service';
import { CompetenciasService } from 'src/app/services/competencias.service';
import { ParticipantesService } from 'src/app/services/participantes.service';
import { AuthService } from 'src/app/services/auth.service';
import { Competencia } from '../competencias/competencias.model';
import { Participante } from '../participantes/participantes.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompetenciaDTO } from '../dtos/competenciasDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {
  fecha: Date | undefined;
  partidos: Partido[] = [];
  partidoForm: FormGroup;
  mostrarFormulario: boolean = false;
  participantes: Participante[] = [];
  competencias: CompetenciaDTO[] = [];
  partidoSeleccionado: Partido | null = null;
  mostrarFormularioEdicion = false;

  constructor(
    private formBuilder: FormBuilder,
    private partidosService: PartidosService,
    private authService: AuthService,
    private competenciasService: CompetenciasService,
    private participantesService: ParticipantesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.partidoForm = this.formBuilder.group({
      goles_local: ['', Validators.required],
      goles_visitante: ['', Validators.required],
      fecha_realizacion: ['', Validators.required],
      competencia: ['', Validators.required],
      local: ['', Validators.required],
      visitante: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerPartidos();
    this.obtenerCompetencias();
    this.fecha = new Date();
    this.obtenerParticipantes();
  }

  logout() {
    this.authService.logout();
  }

  obtenerCompetencias(): void {
    this.competenciasService.obtenerCompetencias().subscribe(
      (competencias: Competencia[]) => {
        this.competencias = competencias.map(competencia => {
          return new CompetenciaDTO(
            competencia.id,
            competencia.nombre,
            "ACTIVO",
            competencia.fecha_inicio ? new Date(competencia.fecha_inicio).toISOString() : '',
            competencia.fecha_creacion ? new Date(competencia.fecha_creacion).toISOString() : '',
            null
          );
        });
      },
      error => {
        console.error('Error al obtener las competencias:', error);
      }
    );
  }

  obtenerPartidos(): void {
    this.partidosService.obtenerPartidosConNombres().subscribe(
      partidos => {
        this.partidos = partidos;
        this.cargarNombresCompetencias();
        this.cargarNombresEquipos();
      },
      error => {
        console.error('Error al obtener los partidos:', error);
      }
    );
  }

  cargarNombresCompetencias() {
    for (let partido of this.partidos) {
      if (partido.competencia) {
        partido.nombreCompetencia = partido.competencia.nombre;
      }
    }
    this.cdr.detectChanges();
  }

  cargarNombresEquipos() {
    for (let partido of this.partidos) {
      const equipoLocalId = partido.local?.id;
      const equipoVisitanteId = partido.visitante?.id;

      const equipoLocal = this.participantes.find(e => e.id === equipoLocalId);
      const equipoVisitante = this.participantes.find(e => e.id === equipoVisitanteId);

      if (equipoLocal) {
        partido.nombreEquipoLocal = equipoLocal.nombre;
      } else {
        partido.nombreEquipoLocal = "Equipo no encontrado";
      }

      if (equipoVisitante) {
        partido.nombreEquipoVisitante = equipoVisitante.nombre;
      } else {
        partido.nombreEquipoVisitante = "Equipo no encontrado";
      }
    }
    this.cdr.detectChanges();
  }

  obtenerParticipantes() {
    this.participantesService.obtenerParticipantes().subscribe(
      (participantes: Participante[]) => {
        this.participantes = participantes;
      },
      error => {
        console.error('Error al obtener los participantes:', error);
      }
    );
  }

  enviarFormulario() {
    if (this.partidoForm.valid) {
      const local = this.partidoForm.value.local;
      const visitante = this.partidoForm.value.visitante;
      const competenciaId = this.partidoForm.value.competencia;

      // Agregar un registro de consola para verificar el ID de la competencia
      console.log('ID de la competencia seleccionada:', competenciaId);

      const golesLocal = this.partidoForm.value.goles_local;
      const golesVisitante = this.partidoForm.value.goles_visitante;
      const fechaRealizacion = this.partidoForm.value.fecha_realizacion;

      const partidoData = {
        goles_local: golesLocal,
        goles_visitante: golesVisitante,
        fecha_realizacion: fechaRealizacion,
        competencia: competenciaId,
        local: local,
        visitante: visitante
      };

      this.partidosService.crearPartido(partidoData).subscribe(
        (respuesta) => {
          console.log('Partido creado exitosamente:', respuesta);
          this.obtenerPartidos();
          this.mostrarFormulario = false;
          this.partidoForm.reset();
        },
        error => {
          console.error('Error al crear el partido:', error);
        }
      );
    }
  }

  eliminarPartido(partidoId: number) {
    this.partidosService.eliminarPartido(partidoId).subscribe(
      () => {
        console.log('Partido eliminado exitosamente');
        // Actualizar la lista de partidos después de eliminar el partido
        this.obtenerPartidos();
      },
      error => {
        console.error('Error al eliminar el partido:', error);
      }
    );
  }

  onSubmit() {
    this.enviarFormulario();
  }

  cancelarCreacionPartido() {
    this.mostrarFormulario = false;
    this.partidoForm.reset();
  }

  editarPartido(partido: Partido): void {
    this.partidoSeleccionado = partido;
    this.partidoForm.patchValue({
      goles_local: partido.goles_local,
      goles_visitante: partido.goles_visitante,
      fecha_realizacion: partido.fecha_realizacion,
      competencia: partido.competencia?.id,
      local: partido.local?.id,
      visitante: partido.visitante?.id
    });
    this.mostrarFormularioEdicion = true;
  }

  guardarCambios(): void {
    if (this.partidoForm.valid && this.partidoSeleccionado) {
      const local = this.partidoForm.value.local;
      const visitante = this.partidoForm.value.visitante;
      const competenciaId = this.partidoForm.value.competencia;
      const fechaRealizacion = this.partidoForm.value.fecha_realizacion;

      // Verificar si los equipos y la competencia son válidos
      const localValido = this.participantes.some(participante => participante.id === local);
      const visitanteValido = this.participantes.some(participante => participante.id === visitante);
      const competenciaEncontrada = this.competencias.some(competencia => competencia.id === competenciaId);

      // Verificar si la fecha de realización del partido es válida
      const fechaActual = new Date();
      const fechaRealizacionValida = new Date(fechaRealizacion) > fechaActual;

      // if (!localValido || !visitanteValido || !competenciaEncontrada || !fechaRealizacionValida) {
      //   if (!localValido) {
      //     console.error('No se encontraron detalles completos del equipo local.');
      //   }
      //   if (!visitanteValido) {
      //     console.error('No se encontraron detalles completos del equipo visitante.');
      //   }
      //   if (!competenciaEncontrada) {
      //     console.error('No se encontró la competencia seleccionada.');
      //   }
      //   if (!fechaRealizacionValida) {
      //     console.error('La fecha de realización del partido debe ser posterior a la fecha actual.');
      //   }
      //   return;
      // }

      const partidoData = {
        id: this.partidoSeleccionado.id,
        goles_local: this.partidoForm.value.goles_local,
        goles_visitante: this.partidoForm.value.goles_visitante,
        fecha_realizacion: this.partidoForm.value.fecha_realizacion,
        competencia: { id: this.partidoForm.value.competencia },
        local: { id: this.partidoForm.value.local },
        visitante: { id: this.partidoForm.value.visitante }
      };

      this.partidosService.actualizarPartido(partidoData).subscribe(
        (respuesta) => {
          console.log('Partido modificado exitosamente:', respuesta);
          this.obtenerPartidos();
          this.mostrarFormularioEdicion = false;
          this.partidoForm.reset();
        },
        error => {
          console.error('Error al modificar el partido:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  cancelarEdicion() {
    this.mostrarFormularioEdicion = false;
    this.partidoForm.reset();
    this.partidoSeleccionado = null;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
