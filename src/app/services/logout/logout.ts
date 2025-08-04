import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logout {
    logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';

    //destuir token desde el back y terminar sesion
  }
}
