import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompetenciasService } from 'src/app/services/competencias.service';
import { Competencia } from '../competencias/competencias.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mod-competencias',
  templateUrl: './modcompetencias.component.html',
  styleUrls: ['./modcompetencias.component.css']
})
export class ModCompetenciasComponent implements OnInit {
  competenciaForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private competenciasService: CompetenciasService, private router: Router, private authService: AuthService) {
    this.competenciaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  crearCompetencia(): void {
    if (this.competenciaForm.valid) {
      const nombre = this.competenciaForm.value.nombre;
      const fechaInicio = this.formatoFechaISO(this.competenciaForm.value.fechaInicio);
  
      const nuevaCompetencia: Competencia = {
        id: 0, // Asigna el valor correspondiente al ID de la competencia
        nombre: nombre,
        estado: "ACTIVO",
        fecha_inicio: fechaInicio,
        fecha_creacion: new Date().toISOString(),
        fecha_baja: null,
        usuario: { id: 1 },
        participantes: [] // Agrega la propiedad participantes con un valor apropiado
      };
      
  
      console.log('Datos de competencia:', nuevaCompetencia);
  
      this.competenciasService.crearCompetencia(nuevaCompetencia).subscribe(
        (competencia: Competencia) => {
          console.log('Competencia creada:', competencia);
          this.router.navigate(['/competencias']);
        },
        (error: any) => {
          console.error('Error al crear la competencia:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  modificarCompetencia(): void {
    if (this.competenciaForm.valid) {
      // Obtener el ID de la competencia que se está modificando
      const competenciaId = this.competenciaForm.value.id; 
      
      // Construir el objeto de competencia con los datos del formulario
      const competenciaModificada: Competencia = {
        id: competenciaId,
        nombre: this.competenciaForm.value.nombre,
        fecha_inicio: this.competenciaForm.value.fechaInicio,
        fecha_creacion: '',
        fecha_baja: null,
        participantes: []
      };

      // Llamar al servicio para modificar la competencia
      this.competenciasService.actualizarCompetencia(competenciaModificada).subscribe(
        (competencia: Competencia) => {
          console.log('Competencia modificada:', competencia);
          this.router.navigate(['/competencias']);
        },
        (error: any) => {
          console.error('Error al modificar la competencia:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
  
  formatoFechaISO(fecha: string): string {
    const date = new Date(fecha);
    const isoString = date.toISOString();
    return isoString;
  }

  cancelar(): void {
    this.router.navigate(['/competencias']);
  }
 
}
