import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionJornadaComponent } from './inscripcion-jornada.component';

describe('InscripcionJornadaComponent', () => {
  let component: InscripcionJornadaComponent;
  let fixture: ComponentFixture<InscripcionJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
