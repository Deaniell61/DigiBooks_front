import { TestBed, inject } from '@angular/core/testing';

import { EventsTypeService } from './events-type.service';

describe('EventsTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsTypeService]
    });
  });

  it('should be created', inject([EventsTypeService], (service: EventsTypeService) => {
    expect(service).toBeTruthy();
  }));
});
