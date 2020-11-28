import { TestBed, inject } from '@angular/core/testing';

import { TareasCursoService } from './tareas-curso.service';

describe('TareasCursoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TareasCursoService]
    });
  });

  it('should be created', inject([TareasCursoService], (service: TareasCursoService) => {
    expect(service).toBeTruthy();
  }));
});
