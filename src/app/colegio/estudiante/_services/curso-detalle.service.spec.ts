import { TestBed, inject } from '@angular/core/testing';

import { CursoDetalleService } from './curso-detalle.service';

describe('CursoDetalleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursoDetalleService]
    });
  });

  it('should be created', inject([CursoDetalleService], (service: CursoDetalleService) => {
    expect(service).toBeTruthy();
  }));
});
