import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CompetenciasComponent } from './components/competencias/competencias.component';
import {MatInputModule} from '@angular/material/input';
import { AltaCompetenciaComponent } from './components/competencias/alta-competencia/alta-competencia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from "@angular/material/form-field";
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { PartidosComponent } from './components/partidos/partidos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompetenciasComponent,
    AltaCompetenciaComponent,
    RegistroComponent,
    HomeComponent,
    TablaComponent,
    EquiposComponent,
    PartidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
