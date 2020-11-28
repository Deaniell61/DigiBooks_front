import { TestBed, inject } from '@angular/core/testing';

import { CursosAlumnoService } from './cursos-alumno.service';

describe('CursosAlumnoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursosAlumnoService]
    });
  });

  it('should be created', inject([CursosAlumnoService], (service: CursosAlumnoService) => {
    expect(service).toBeTruthy();
  }));
});
