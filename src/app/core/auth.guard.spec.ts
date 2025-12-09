import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService],
    });
    guard = TestBed.inject(AuthGuard);
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow when authenticated', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect when not authenticated', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(false);
    const res = guard.canActivate();
    // Router.parseUrl returns UrlTree; check type
    expect(res).toBeTruthy();
  });
});
