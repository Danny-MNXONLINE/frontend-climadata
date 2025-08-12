import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should redirect to /login if no token', (done) => {
    sessionStorage.removeItem('token');

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should return true if token is valid and user found', (done) => {
    sessionStorage.setItem('token', 'valid-token');

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/users/currentuser');
    expect(req.request.headers.get('Authorization')).toBe('Bearer valid-token');

    req.flush({ name: 'User' }); // Respuesta simulada exitosa
  });

  it('should redirect to /login if token invalid or error in request', (done) => {
    sessionStorage.setItem('token', 'invalid-token');

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/users/currentuser');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });
});
 