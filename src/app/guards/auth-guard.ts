import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = sessionStorage.getItem('token'); // o sessionStorage
    const isLoggedIn = !!token;

    if (!isLoggedIn) {
      return this.router.createUrlTree(['/login']); // redirige si no está logueado
    }

    return true; // permite acceso si hay token
  }
}
