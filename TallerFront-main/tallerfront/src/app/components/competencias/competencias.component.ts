import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetenciasService } from 'src/app/services/competencias.service';
import { Competencia } from '../competencias/competencias.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  @Component({
    selector: 'app-competencias',
    templateUrl: './competencias.component.html',
    styleUrls: ['./competencias.component.css']
  })
  export class CompetenciasComponent implements OnInit {
    competencias: Competencia[] = [];
    formularioEditar: FormGroup;
  competenciaSeleccionada: Competencia | null = null;
  mostrarFormularioEditar = false;

    constructor(private formBuilder: FormBuilder,private competenciaService: CompetenciasService, private authService: AuthService, private router: Router) {
      this.formularioEditar = this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required]
    });
    }

    ngOnInit(): void {
      this.obtenerCompetencias(); 
    }


    obtenerCompetencias(): void {
      this.competenciaService.obtenerCompetencias().subscribe(
        (competencias: Competencia[]) => {
          this.competencias = competencias;
        },
        (error: any) => {
          console.log('Error al obtener las competencias: ', error);
        }
      );
    }

    logout() {
      this.authService.logout();
    }

    navigateToStandings() {
      // Implementa aquí la lógica para navegar a la tabla de posiciones
      console.log('Navegar a la tabla de posiciones');
    }

    navigateToFixture() {
      // Implementa aquí la lógica para navegar al fixture
      console.log('Navegar al fixture');
    }

    eliminarCompetencia(id: number): void {
      this.competenciaService.eliminarCompetencia(id).subscribe(
          () => {
              console.log('Competencia eliminada exitosamente');
              // Actualizar la lista de competencias después de eliminar
              this.obtenerCompetencias();
          },
          (error: any) => {
              console.error('Error al eliminar competencia:', error);
          }
      );
    }

    editarCompetencia(competencia: Competencia): void {
      this.competenciaSeleccionada = competencia;
      this.formularioEditar.patchValue({
        nombre: competencia.nombre,
        fechaInicio: competencia.fecha_inicio
      });
      this.mostrarFormularioEditar = true;
    }
  
    guardarCambios(): void {
      if (this.formularioEditar.valid && this.competenciaSeleccionada) {
        const nombre = this.formularioEditar.value.nombre;
        const fechaInicio = this.formularioEditar.value.fechaInicio;
  
        // Actualiza los datos de la competencia seleccionada
        this.competenciaSeleccionada.nombre = nombre;
        this.competenciaSeleccionada.fecha_inicio = fechaInicio;
  
        // Llama al servicio para actualizar la competencia
        this.competenciaService.actualizarCompetencia(this.competenciaSeleccionada).subscribe(
          (competencia: Competencia) => {
            console.log('Competencia modificada:', competencia);
            // Actualiza la lista de competencias después de la modificación
            this.obtenerCompetencias();
            this.mostrarFormularioEditar = false; // Oculta el formulario de edición
          },
          (error: any) => {
            console.error('Error al modificar la competencia:', error);
          }
        );
      } else {
        console.error('Formulario inválido');
      }
    }
  
    cancelarEdicion(): void {
      this.mostrarFormularioEditar = false;
    }

    isActive(route: string): boolean {
      return this.router.url === route;
    }
  }
  
  