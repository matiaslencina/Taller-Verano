import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partido } from '../components/partidos/partidos.model';
import { Competencia } from '../components/competencias/competencias.model';
import { Participante } from '../components/participantes/participantes.model';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {
  private baseUrl = 'http://localhost:8080/api/v1'; 

  constructor(private http: HttpClient) { }

 // Método para obtener competencias
 getCompetencias(): Observable<Competencia[]> {
  return this.http.get<Competencia[]>(`${this.baseUrl}/competencias`);
}

// Método para obtener participantes
getParticipantes(): Observable<Participante[]> {
  return this.http.get<Participante[]>(`${this.baseUrl}/participantes`);
}

// Método para obtener partidos
getPartidos(): Observable<Partido[]> {
  return this.http.get<Partido[]>(`${this.baseUrl}/partidos`);
}
}

