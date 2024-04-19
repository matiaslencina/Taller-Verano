 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { Participante } from '../components/participantes/participantes.model';

@Injectable({
  providedIn: 'root'
 })
 export class ParticipantesService {

   private baseUrl = 'http://localhost:8080/api/v1/participantes';

   constructor(private http: HttpClient) { }

  obtenerParticipantes(): Observable<Participante[]> {
    return this.http.get<Participante[]>(this.baseUrl);
}
}
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Participante } from '../components/participantes/participantes.model';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ParticipantesService {

//   private baseUrl = 'http://localhost:8080/api/v1/participantes';
//   private saveUrl = 'http://localhost:8080/api/v1/participante/save';

//   constructor(private http: HttpClient, private authService: AuthService) { }

//   obtenerParticipantes(): Observable<Participante[]> {
//     const token = this.authService.getToken();

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });

//     return this.http.get<Participante[]>(this.baseUrl, { headers });
//   }

//   crearParticipante(participante: Participante): Observable<Participante> {
//     const token = this.authService.getToken();

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });

//     return this.http.post<Participante>(this.saveUrl, participante, { headers });
//   }

//   actualizarParticipante(participante: Participante): Observable<Participante> {
//     const token = this.authService.getToken();
  
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
  
//     const url = `${this.baseUrl}/${participante.id}`; // Utiliza la ruta correcta de actualización que incluya el ID del participante
//     return this.http.put<Participante>(url, participante, { headers });
//   }
  

//   eliminarParticipante(id: number): Observable<void> {
//     const token = this.authService.getToken();

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });

//     const url = `${this.baseUrl}/${id}`;
//     return this.http.delete<void>(url, { headers });
//   }
// }
