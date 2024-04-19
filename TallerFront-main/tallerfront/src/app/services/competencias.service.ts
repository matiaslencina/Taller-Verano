import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competencia } from '../components/competencias/competencias.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'  
})
export class CompetenciasService {

  private baseUrl = 'http://localhost:8080/api/v1/competencias';
  private saveUrl = 'http://localhost:8080/api/v1/competencia/save';
  private updateUrl = 'http://localhost:8080/api/v1/competencia/update';


  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerCompetencias(): Observable<Competencia[]> {
    
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Competencia[]>(this.baseUrl, { headers });
  }

  crearCompetencia(competencia: Competencia): Observable<Competencia> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Competencia>(this.saveUrl, competencia, { headers });
  }

  obtenerCompetenciaPorNombre(nombre: string): Observable<Competencia> {
    
    return this.http.get<Competencia>(`${this.baseUrl}/competencias/${nombre}`);
  }

  eliminarCompetencia(id: number): Observable<void> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/${id}`; // URL para eliminar la competencia por ID
    return this.http.delete<void>(url, { headers });
}

    obtenerCompetenciaPorId(competenciaId: number): Observable<Competencia> {
      const headers = this.getHeaders();
      return this.http.get<Competencia>(`${this.baseUrl}/${competenciaId}`, { headers });
    }

    actualizarCompetencia(competencia: Competencia): Observable<Competencia> {
      const token = this.authService.getToken();
    
      // Establece los encabezados de la solicitud
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    
      // Construye la URL para actualizar la competencia
      const url = `${this.baseUrl}/${competencia.id}`;
    
      // Envía la solicitud PUT al servidor con la competencia modificada
      return this.http.put<Competencia>(url, competencia, { headers });
    }
    
    private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
  
      if (token) {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      } else {
        // Manejar la ausencia del token (redireccionar al login, etc.)
        return new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }
    }
}


  


  