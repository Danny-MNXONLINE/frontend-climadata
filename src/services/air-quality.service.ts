import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AirQualityService {
  private backendUrl = 'http://localhost:3000/air-quality';

  constructor(private http: HttpClient) {}

  fetchFromApiById(id: number) {
    return this.http.get(`${this.backendUrl}/locations/fetch?id=${id}`);
  }
}
