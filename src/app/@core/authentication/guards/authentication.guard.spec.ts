import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthGuardGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
