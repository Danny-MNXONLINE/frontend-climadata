import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AirQualityService } from '../../../services/air-quality.service';
import { tap } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GeolocationService } from '../../services/geoLocation/geoLocation';
import { MatButton } from '@angular/material/button';
import { createGlobalPositionStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-panel-aq',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatProgressSpinnerModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    MatInput,
    MatAutocompleteModule,
    MatButton
  ],
  templateUrl: './panel-aq.html',
  styleUrls: ['./panel-aq.scss'],
})
export class PanelAq {

  elemts = signal<any[]>([]);
  selectedId = signal<number | null>(null);
  parameters = signal<any[]>([]);
  loading = signal(false);
  isPosition = signal(false);

  inputValue = ''
  filteredRes: any[] = []

  constructor(
    private http: HttpClient,
    private airQualityService: AirQualityService,
    private geo: GeolocationService
  ) { }

  togglePositionBbox() {
    console.log('se cambia a Bbox')
    this.isPosition.set(true)
    this.fetchFromPosition();
  }

  togglePositionDefault(){
    console.log('se cambia a default');
    this.isPosition.set(false);
    this.fetchData();
  }

  ngOnInit() {
    if (this.isPosition()) {
      this.fetchFromPosition()
      console.log('fromPosition')
    }
    this.fetchData();
    console.log('byDefault')
  }


  processBoundingBox(): Promise<[number, number, number, number]> {
    return this.geo.getCurrentPosition().then(position => {
      const { latitude, longitude } = position.coords;
      const bboxObj = this.getBoundingBox(latitude, longitude, 0.5);
      const bbox: [number, number, number, number] = [
        bboxObj.minLon,
        bboxObj.minLat,
        bboxObj.maxLon,
        bboxObj.maxLat
      ];
      console.log(bbox)
      return bbox;
    });
  }

  getBoundingBox(lat: number, lon: number, delta: number) {
    return {
      minLat: lat - delta,
      maxLat: lat + delta,
      minLon: lon - delta,
      maxLon: lon + delta,
    };
  }

  fetchFromPosition() {
    this.processBoundingBox().then(bbox => {
      this.airQualityService.sendBbox(bbox).subscribe({
        next: response => {
          console.log('Air Quality Data:', response);
          this.elemts.set(response)
        },
        error: (err) => console.error('Error al obtener datos:', err)
      });
    });
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/air-quality/locations').subscribe({
      next: (res) => {
        this.elemts.set(res)
        console.log(this.elemts())
      },
      error: (err) => console.error('Error al obtener datos:', err),
    }
    );
  }

  onSelectId(id: number) {
    this.selectedId.set(id);
    this.loading.set(true);
    this.airQualityService
      .fetchFromApiById(id)
      .pipe(
        tap(() => this.loading.set(false))
      )
      .subscribe({
        next: (res) => {
          this.parameters.set(Array.isArray(res) ? res : []);
        },
        error: (err) => {
          console.error('Error:', err);
          this.parameters.set([]);
          this.loading.set(false);
        },
      });
  }

  filter() {
    const input = this.inputValue.toLowerCase();
    this.filteredRes = this.elemts().filter(elemt => elemt.name.toLowerCase().includes(input))
    console.log(this.filteredRes)
  }
}
