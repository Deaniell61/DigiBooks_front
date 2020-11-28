import { TestBed, inject } from '@angular/core/testing';

import { InscriptionsStudyingDayService } from './inscriptions-studying-day.service';

describe('InscriptionsStudyingDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InscriptionsStudyingDayService]
    });
  });

  it('should be created', inject([InscriptionsStudyingDayService], (service: InscriptionsStudyingDayService) => {
    expect(service).toBeTruthy();
  }));
});
