import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasCursoComponent } from './tareas-curso.component';

describe('TareasCursoComponent', () => {
  let component: TareasCursoComponent;
  let fixture: ComponentFixture<TareasCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
