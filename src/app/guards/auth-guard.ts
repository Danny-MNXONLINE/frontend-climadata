import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = sessionStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ name: string }>('http://localhost:3000/users/currentuser', { headers }).pipe(
      map((res) => {
        if (res) {
          console.log('✅ usuario autentificado', res);
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }),
      catchError((err) => {
        console.error('❌ usuario no autentificado', err);
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }
}

