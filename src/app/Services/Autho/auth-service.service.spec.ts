import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service.service';  // Corrected import

describe('AuthService', () => {  // Use the correct name here as well
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
