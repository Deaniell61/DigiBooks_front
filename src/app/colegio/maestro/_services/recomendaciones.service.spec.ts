import { TestBed, inject } from '@angular/core/testing';

import { RecomendacionesService } from './recomendaciones.service';

describe('RecomendacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecomendacionesService]
    });
  });

  it('should be created', inject([RecomendacionesService], (service: RecomendacionesService) => {
    expect(service).toBeTruthy();
  }));
});
