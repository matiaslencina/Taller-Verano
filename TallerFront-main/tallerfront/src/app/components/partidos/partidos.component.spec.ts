import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosComponent } from './partidos.component';

describe('PartidosComponent', () => {
  let component: PartidosComponent;
  let fixture: ComponentFixture<PartidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosComponent]
    });
    fixture = TestBed.createComponent(PartidosComponent); // Crea una instancia del componente
    component = fixture.componentInstance; // Accede a la instancia del componente
    fixture.detectChanges(); // Detecta los cambios en el componente
  });

  // Prueba para verificar si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica si el componente es verdadero (no nulo)
  });
});
