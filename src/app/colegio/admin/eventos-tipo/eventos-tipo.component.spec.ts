import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosTipoComponent } from './eventos-tipo.component';

describe('EventosTipoComponent', () => {
  let component: EventosTipoComponent;
  let fixture: ComponentFixture<EventosTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
