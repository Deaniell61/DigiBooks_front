import { TestBed, inject } from '@angular/core/testing';

import { CursoAlumnosService } from './curso-alumnos.service';

describe('CursoAlumnosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursoAlumnosService]
    });
  });

  it('should be created', inject([CursoAlumnosService], (service: CursoAlumnosService) => {
    expect(service).toBeTruthy();
  }));
});
