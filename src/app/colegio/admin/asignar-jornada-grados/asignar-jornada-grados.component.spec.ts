import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarJornadaGradosComponent } from './asignar-jornada-grados.component';

describe('AsignarJornadaGradosComponent', () => {
  let component: AsignarJornadaGradosComponent;
  let fixture: ComponentFixture<AsignarJornadaGradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarJornadaGradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarJornadaGradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
