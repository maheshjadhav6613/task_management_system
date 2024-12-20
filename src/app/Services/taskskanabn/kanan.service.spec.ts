import { TestBed } from '@angular/core/testing';

import { KananService } from './kanan.service';

describe('KananService', () => {
  let service: KananService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KananService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
