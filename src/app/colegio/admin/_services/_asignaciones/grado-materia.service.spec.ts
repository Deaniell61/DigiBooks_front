import { TestBed, inject } from '@angular/core/testing';

import { GradoMateriaService } from './grado-materia.service';

describe('GradoMateriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GradoMateriaService]
    });
  });

  it('should be created', inject([GradoMateriaService], (service: GradoMateriaService) => {
    expect(service).toBeTruthy();
  }));
});
