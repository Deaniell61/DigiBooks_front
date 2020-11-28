import { TestBed, inject } from '@angular/core/testing';

import { CyclesService } from './cycles.service';

describe('CyclesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CyclesService]
    });
  });

  it('should be created', inject([CyclesService], (service: CyclesService) => {
    expect(service).toBeTruthy();
  }));
});
