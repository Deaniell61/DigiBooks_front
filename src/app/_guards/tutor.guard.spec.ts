import { TestBed, async, inject } from '@angular/core/testing';

import { TutorGuard } from './tutor.guard';

describe('TutorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorGuard]
    });
  });

  it('should ...', inject([TutorGuard], (guard: TutorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
