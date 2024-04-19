import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partido } from '../components/partidos/partidos.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  private baseUrl = 'http://localhost:8080/api/v1/partidos';
  private saveUrl = 'http://localhost:8080/api/v1/partido/save';
  private deleteUrl = 'http://localhost:8080/api/v1/partidos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerPartidosConNombres(): Observable<Partido[]> {
    const headers = this.getHeaders();
    return this.http.get<Partido[]>(this.baseUrl, { headers });
  }

  obtenerPartidosProgramados(competenciaId: number): Observable<Partido[]> {
    const headers = this.getHeaders();
    return this.http.get<Partido[]>(`${this.baseUrl}/competencia/${competenciaId}`, { headers });
  } 

  crearPartido(partidoData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.saveUrl, partidoData, { headers });
  }

  eliminarPartido(partidoId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.deleteUrl}/${partidoId}`, { headers });
  }

  actualizarPartido(partidoData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/${partidoData.id}`, partidoData, { headers });
  }
  

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
  
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }
}
