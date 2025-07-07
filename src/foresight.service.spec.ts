/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForesightService } from './foresight.service';

describe('Service: Foresight', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForesightService]
    });
  });

  it('should ...', inject([ForesightService], (service: ForesightService) => {
    expect(service).toBeTruthy();
  }));
});
