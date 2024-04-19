import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtInterceptor } from 'src/interceptors/jwt.interceptor';
import { HomeComponent } from './components/home/home.component';
import { CompetenciasComponent } from './components/competencias/competencias.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { MatCardModule } from '@angular/material/card';
import { RegistroComponent } from './components/registro/registro.component';
import { ParticipantesComponent } from './components/participantes/participantes.component';
import { ModCompetenciasComponent } from './components/modcompetencias/modcompetencias.component';
import { FixtureComponent } from './components/fixture/fixture.component';
import { CommonModule } from '@angular/common';
import { ResultadoComponent } from './components/resultado/resultado.component';





@NgModule({
  declarations: [
    AppComponent, LoginComponent,  HomeComponent, CompetenciasComponent, PartidosComponent, ClasificacionComponent, RegistroComponent, ParticipantesComponent, ModCompetenciasComponent, FixtureComponent, ResultadoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule, 
    MatOptionModule, 
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule, 
    FormsModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
