import { TestBed } from '@angular/core/testing';

import { TripMenagerGuard } from './trip-menager.guard';

describe('TripMenagerGuard', () => {
  let guard: TripMenagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TripMenagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
