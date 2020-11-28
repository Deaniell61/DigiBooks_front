import { TestBed, inject } from '@angular/core/testing';

import { CobrosService } from './cobros.service';

describe('CobrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CobrosService]
    });
  });

  it('should be created', inject([CobrosService], (service: CobrosService) => {
    expect(service).toBeTruthy();
  }));
});
