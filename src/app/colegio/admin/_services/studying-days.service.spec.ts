import { TestBed, inject } from '@angular/core/testing';

import { StudyingDaysService } from './studying-days.service';

describe('StudyingDaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyingDaysService]
    });
  });

  it('should be created', inject([StudyingDaysService], (service: StudyingDaysService) => {
    expect(service).toBeTruthy();
  }));
});
