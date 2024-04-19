import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetenciasComponent } from './competencias.component';

describe('CompetenciaComponent', () => {
  let component: CompetenciasComponent;
  let fixture: ComponentFixture<CompetenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenciasComponent]
    });
    fixture = TestBed.createComponent(CompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

