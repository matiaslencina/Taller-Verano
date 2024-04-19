import { Component, OnInit } from '@angular/core';
import { ParticipantesService } from 'src/app/services/participantes.service'; // Aquí asegúrate de importar el servicio correcto
import { Participante } from './participantes.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

 @Component({
   selector: 'app-participantes',
   templateUrl: './participantes.component.html',
   styleUrls: ['./participantes.component.css']
 })
 export class ParticipantesComponent implements OnInit {

   participantes: Participante[] = [];

   constructor(private participantesService: ParticipantesService, private authService: AuthService, private router: Router) { }

   ngOnInit(): void {
     this.obtenerParticipantes();
   }

   logout() {
     this.authService.logout();
   }

   obtenerParticipantes(): void {
     this.participantesService.obtenerParticipantes().subscribe(
       (participantes: Participante[]) => {
         this.participantes = participantes;
         console.log('Participantes cargados:', this.participantes); // Agregar esta línea
       },
       (error: any) => {
         console.error("Error al obtener los participantes:", error);
       }
     );
   }

   isActive(route: string): boolean {
    return this.router.url === route;
  }
  
 }
// import { Component, OnInit } from '@angular/core';
// import { ParticipantesService } from 'src/app/services/participantes.service'; // Aquí asegúrate de importar el servicio correcto
// import { Participante } from './participantes.model';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-participantes',
//   templateUrl: './participantes.component.html',
//   styleUrls: ['./participantes.component.css']
// })
// export class ParticipantesComponent implements OnInit {
//   participantes: Participante[] = [];

//   constructor(private participantesService: ParticipantesService, private authService: AuthService) { }

//   ngOnInit(): void {
//     this.obtenerParticipantes();
//   }

//   obtenerParticipantes(): void {
//     this.participantesService.obtenerParticipantes().subscribe(
//       (participantes: Participante[]) => {
//         this.participantes = participantes;
//         console.log('Participantes cargados:', this.participantes); // Agregar esta línea
//       },
//       (error: any) => {
//         console.error("Error al obtener los participantes:", error);
//       }
//     );
//   }

//   // NUEVOS

//   crearParticipante(participante: Participante): void {
//     this.participantesService.crearParticipante(participante).subscribe(
//       (nuevoParticipante: Participante) => {
//         this.participantes.push(nuevoParticipante);
//       },
//       (error: any) => {
//         console.error("Error al crear el participante:", error);
//       }
//     );
//   }

//   crearNuevoParticipante(): void {
//     const nuevoParticipante: Participante = {
//       id: 0, // Supongamos que el id es generado por el servidor
//       nombre: '', // Agrega otros campos necesarios aquí
//       colores: '',
//       trofeos: '',
//       fecha_baja: null // Por ejemplo, establece la fecha actual como fecha de baja
//     };
//     this.crearParticipante(nuevoParticipante);
//   }
  

//   actualizarParticipante(participante: Participante): void {
//     this.participantesService.actualizarParticipante(participante).subscribe(
//       () => {
//         console.log("Participante actualizado exitosamente");
//       },
//       (error: any) => {
//         console.error("Error al actualizar el participante:", error);
//       }
//     );
//   }
  

//   eliminarParticipante(id: number): void {
//     this.participantesService.eliminarParticipante(id).subscribe(
//       () => {
//         this.participantes = this.participantes.filter(p => p.id !== id);
//         console.log("Participante eliminado exitosamente");
//       },
//       (error: any) => {
//         console.error("Error al eliminar el participante:", error);
//       }
//     );
//   }

//   logout() {
//     this.authService.logout();
//   }
  
// }


