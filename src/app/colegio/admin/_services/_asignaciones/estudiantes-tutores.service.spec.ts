import { TestBed, inject } from '@angular/core/testing';

import { EstudiantesTutoresService } from './estudiantes-tutores.service';

describe('EstudiantesTutoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstudiantesTutoresService]
    });
  });

  it('should be created', inject([EstudiantesTutoresService], (service: EstudiantesTutoresService) => {
    expect(service).toBeTruthy();
  }));
});
