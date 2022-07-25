import { TestBed } from '@angular/core/testing';

import { SiscointService } from './siscoint.service';

describe('SiscointService', () => {
  let service: SiscointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiscointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
