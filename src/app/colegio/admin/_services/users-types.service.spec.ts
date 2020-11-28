import { TestBed, inject } from '@angular/core/testing';

import { UsersTypesService } from './users-types.service';

describe('UsersTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersTypesService]
    });
  });

  it('should be created', inject([UsersTypesService], (service: UsersTypesService) => {
    expect(service).toBeTruthy();
  }));
});
