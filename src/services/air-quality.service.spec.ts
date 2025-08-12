// src/app/services/air-quality.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AirQualityService } from './air-quality.service';

describe('AirQualityService', () => {
  let service: AirQualityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirQualityService]
    });
    service = TestBed.inject(AirQualityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener datos por ID desde el backend', () => {
    const mockData = { id: 1, city: 'Las Palmas', aqi: 42 };

    service.fetchFromApiById(1).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/air-quality/locations/fetch?id=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debería enviar un BBOX y recibir una lista', () => {
    const mockBbox = [10, 20, 30, 40] as [number, number, number, number];
    const mockResponse = [
      { city: 'Las Palmas', aqi: 42 },
      { city: 'Santa Cruz', aqi: 37 }
    ];

    service.sendBbox(mockBbox).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/air-quality/bbox?bbox=10,20,30,40');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
