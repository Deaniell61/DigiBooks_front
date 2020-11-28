import { TestBed, inject } from '@angular/core/testing';

import { InscriptionsService } from './inscriptions.service';

describe('InscriptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InscriptionsService]
    });
  });

  it('should be created', inject([InscriptionsService], (service: InscriptionsService) => {
    expect(service).toBeTruthy();
  }));
});
