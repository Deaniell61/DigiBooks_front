import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriaMaestrosComponent } from './asignar-materia-maestros.component';

describe('AsignarMateriaMaestrosComponent', () => {
  let component: AsignarMateriaMaestrosComponent;
  let fixture: ComponentFixture<AsignarMateriaMaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarMateriaMaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarMateriaMaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
