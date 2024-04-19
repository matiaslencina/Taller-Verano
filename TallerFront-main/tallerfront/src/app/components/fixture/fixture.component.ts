import { Component, OnInit } from '@angular/core';
import { FixtureService } from 'src/app/services/fixture.service';
import { Partido } from '../partidos/partidos.model';
import { AuthService } from 'src/app/services/auth.service';
import { Competencia } from '../competencias/competencias.model';
import { forkJoin } from 'rxjs';
import { Participante } from '../participantes/participantes.model';
import { Enfrentamiento } from '../fixture/fixture.model';
import { Router } from '@angular/router'; 

interface Fixture {
  competencia: string;
  fechaPartido: string;
  enfrentamientos: Enfrentamiento[];
}

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
  competencias: Competencia[] = [];
  participantes: Participante[] = [];
  partidos: Partido[] = [];
  fixture: Fixture[] = [];

  constructor(
    private fixtureService: FixtureService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin({
      competencias: this.fixtureService.getCompetencias(),
      participantes: this.fixtureService.getParticipantes(),
      partidos: this.fixtureService.getPartidos()
    }).subscribe(({ competencias, participantes, partidos }) => {
      this.competencias = competencias;
      this.participantes = participantes;
      this.partidos = partidos;
      this.construirFixture();
    });
  }

  construirFixture(): void {
    this.competencias.forEach(competencia => {
      const partidosCompetencia = this.partidos.filter(partido => partido.competencia?.id === competencia.id);

      if (partidosCompetencia.length > 0) {
        const enfrentamientos: Enfrentamiento[] = [];
        partidosCompetencia.forEach(partido => {
          const participanteLocal = partido.local;
          const participanteVisitante = partido.visitante;

          if (participanteLocal && participanteVisitante) {
            enfrentamientos.push({
              participante: participanteLocal.nombre,
              oponente: participanteVisitante.nombre,
              competencia: competencia.nombre,
              fechaPartido: new Date(partido.fecha_realizacion).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
              enfrentamientos: []
            });
          } else {
            console.log('Participantes inválidos para el partido:', partido);
          }
        });

        this.fixture.push({
          competencia: competencia.nombre,
          fechaPartido: '', // No necesitamos esto ya que se llena en cada enfrentamiento
          enfrentamientos: enfrentamientos
        });
      } else {
        console.log('No hay partidos para la competencia');
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
