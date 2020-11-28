import { TestBed, inject } from '@angular/core/testing';

import { CiclosJornadaService } from './ciclos-jornada.service';

describe('CiclosJornadaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiclosJornadaService]
    });
  });

  it('should be created', inject([CiclosJornadaService], (service: CiclosJornadaService) => {
    expect(service).toBeTruthy();
  }));
});
