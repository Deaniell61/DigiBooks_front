import { TestBed, inject } from '@angular/core/testing';

import { JornadaGradoService } from './jornada-grado.service';

describe('JornadaGradoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JornadaGradoService]
    });
  });

  it('should be created', inject([JornadaGradoService], (service: JornadaGradoService) => {
    expect(service).toBeTruthy();
  }));
});
