import { TestBed, inject } from '@angular/core/testing';

import { MateriaMaestroService } from './materia-maestro.service';

describe('MateriaMaestroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MateriaMaestroService]
    });
  });

  it('should be created', inject([MateriaMaestroService], (service: MateriaMaestroService) => {
    expect(service).toBeTruthy();
  }));
});
