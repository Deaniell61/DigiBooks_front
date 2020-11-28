import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarGradoMateriasComponent } from './asignar-grado-materias.component';

describe('AsignarGradoMateriasComponent', () => {
  let component: AsignarGradoMateriasComponent;
  let fixture: ComponentFixture<AsignarGradoMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarGradoMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarGradoMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
