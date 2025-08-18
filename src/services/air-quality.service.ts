import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AirQualityService {
  private backendUrl = 'http://localhost:3000/air-quality';

  constructor(private http: HttpClient) { }

  fetchFromApiById(id: number) {
    return this.http.get(`${this.backendUrl}/locations/fetch?id=${id}`);
  }

  sendBbox(bbox: [number, number, number, number]) {
    const bboxStr = bbox.join(',');
    return this.http.get<any[]>(`${this.backendUrl}/bbox?bbox=${bboxStr}`);
  }
}
