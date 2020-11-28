import { TestBed, inject } from '@angular/core/testing';

import { DetalleAlumnoService } from './detalle-alumno.service';

describe('DetalleAlumnoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalleAlumnoService]
    });
  });

  it('should be created', inject([DetalleAlumnoService], (service: DetalleAlumnoService) => {
    expect(service).toBeTruthy();
  }));
});
