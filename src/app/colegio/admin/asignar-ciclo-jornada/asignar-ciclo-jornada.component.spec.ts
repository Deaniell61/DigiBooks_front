import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCicloJornadaComponent } from './asignar-ciclo-jornada.component';

describe('AsignarCicloJornadaComponent', () => {
  let component: AsignarCicloJornadaComponent;
  let fixture: ComponentFixture<AsignarCicloJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarCicloJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCicloJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
