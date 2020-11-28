import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosTipoComponent } from './usuarios-tipo.component';

describe('UsuariosTipoComponent', () => {
  let component: UsuariosTipoComponent;
  let fixture: ComponentFixture<UsuariosTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
