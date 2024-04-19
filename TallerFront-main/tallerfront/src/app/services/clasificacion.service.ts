import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClasificacionDTO } from '../components/clasificacion/clasificacion.model';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  private apiUrl = 'http://localhost:8080/api/v1/clasificaciones';

  constructor(private http: HttpClient) { }

  getClasificaciones(): Observable<ClasificacionDTO[]> {
    return this.http.get<ClasificacionDTO[]>(`${this.apiUrl}`);
  }

  getClasificacionById(id: number): Observable<ClasificacionDTO> {
    return this.http.get<ClasificacionDTO>(`${this.apiUrl}/${id}`);
  }

  createClasificacion(clasificacion: ClasificacionDTO): Observable<ClasificacionDTO> {
    return this.http.post<ClasificacionDTO>(`${this.apiUrl}`, clasificacion);
  }

  updateClasificacion(id: number, clasificacion: ClasificacionDTO): Observable<ClasificacionDTO> {
    return this.http.put<ClasificacionDTO>(`${this.apiUrl}/${id}`, clasificacion);
  }

  deleteClasificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
