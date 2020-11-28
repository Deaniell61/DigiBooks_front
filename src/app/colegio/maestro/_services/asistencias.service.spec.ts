import { TestBed, inject } from '@angular/core/testing';

import { AsistenciasService } from './asistencias.service';

describe('AsistenciasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsistenciasService]
    });
  });

  it('should be created', inject([AsistenciasService], (service: AsistenciasService) => {
    expect(service).toBeTruthy();
  }));
});
