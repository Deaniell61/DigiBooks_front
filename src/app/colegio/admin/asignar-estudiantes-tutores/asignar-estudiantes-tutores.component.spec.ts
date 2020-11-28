import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEstudiantesTutoresComponent } from './asignar-estudiantes-tutores.component';

describe('AsignarEstudiantesTutoresComponent', () => {
  let component: AsignarEstudiantesTutoresComponent;
  let fixture: ComponentFixture<AsignarEstudiantesTutoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarEstudiantesTutoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEstudiantesTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
