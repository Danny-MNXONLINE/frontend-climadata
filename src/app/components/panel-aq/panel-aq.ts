import { Component, computed, effect, OnInit, signal, untracked } from '@angular/core';
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
import { Loading } from '../../lotties/loading/loading';

//interfaces para acceder a campos de objetos porque ts es tonto

interface Sensor {
  id: number;
  name: string;
}

interface Measurement {
  id: number;
  value: string;
}

interface firstPositionElemts {
  sensor: any;
  measurements: any;
}


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
    MatButton,
    Loading
  ],
  templateUrl: './panel-aq.html',
  styleUrls: ['./panel-aq.scss'],
})
export class PanelAq implements OnInit {

  //leyenda


  elemts = signal<any[]>([]);
  selectedId = signal<number | null>(null);
  parameters = signal<any[]>([]);
  loading = signal(false);
  isPosition = signal(false);
  firstPositionElemts = signal<any[]>([]);
  firstPosition = signal<number | null>(null);
  closestElement = signal<any[]>([]);
  firstPositionName = signal("")

  inputValue = ''
  filteredRes: any[] = []

  private firstPositionEffect = effect(() => {
    const pos = this.firstPosition();
    if (pos) {
      this.fetchFirstPositionMeasurements(pos);
    }
  });

  private closestPositionEffect = effect(() => {
    const elem = this.firstPositionElemts();
    if (elem && elem.length > 1) {
      untracked(() => this.showClosestPosition());
    }
  })

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

  togglePositionDefault() {
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
    console.log('byDefault');
  }


  async processBoundingBox(): Promise<[number, number, number, number]> {
    return await this.geo.getCurrentPosition().then(position => {
      const { latitude, longitude } = position.coords;
      const bboxObj = this.getBoundingBox(latitude, longitude, 0.4);
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
          this.firstPosition.set(response[0].id)
          this.firstPositionName.set(response[0].name)
          console.log(this.firstPosition())
        },
        error: (err) => console.error('Error al obtener datos:', err)
      });
    });
  }

  fetchFirstPositionMeasurements(firstPosition: any) {
    this.airQualityService.fetchFromApiById(firstPosition).subscribe({
      next: (res) => {
        console.log(res);
        this.firstPositionElemts.set(Array.isArray(res) ? res : []);
        console.log(this.firstPositionElemts());
        console.log(this.firstPositionName());

      },
      error: (err) => {
        console.log(err);
      }
    })
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
          console.log(res)
          const processableObject: any = res
          const dataSensors = processableObject[0] || [];
          const dataMeasurements = processableObject[1] || [];

          console.log("=== Sensors snapshot ===", dataSensors);
          console.log("=== Measurements snapshot ===", dataMeasurements);

          const sensors = dataSensors.sensors
            .filter((item: any) => item.id && item.name)
            .map((s: any) => ({ ...s, id: Number(s.id) }));

          const measurements = dataMeasurements.measurements
            .filter((item: any) => item.sensorsId)
            .map((m: any) => ({ ...m, sensorsId: Number(m.sensorsId) }));

          const paired = sensors.map((sensor: any) => {
            const measurement = measurements.find((m: any) => m.sensorsId === sensor.id);
            return {
              name: sensor.name,
              value: measurement ? measurement.value : null
            };
          });

          console.log("=== Paired snapshot ===", paired);

          this.parameters.set(paired);
          console.log(this.parameters())
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

  showClosestPosition() {
    // Capturamos el snapshot para evitar cambios reactivos
    const allData = structuredClone(this.firstPositionElemts());

    console.log("=== RAW allData ===", allData);

    const dataSensors = allData[0] || [];
    const dataMeasurements = allData[1] || [];

    console.log("=== Sensors snapshot ===", dataSensors);
    console.log("=== Measurements snapshot ===", dataMeasurements);

    const sensors = dataSensors.sensors
      .filter((item: any) => item.id && item.name)
      .map((s: any) => ({ ...s, id: Number(s.id) }));

    const measurements = dataMeasurements.measurements
      .filter((item: any) => item.sensorsId)
      .map((m: any) => ({ ...m, sensorsId: Number(m.sensorsId) }));

    const paired = sensors.map((sensor: any) => {
      const measurement = measurements.find((m: any) => m.sensorsId === sensor.id);
      return {
        name: sensor.name,
        value: measurement ? measurement.value : null
      };
    });

    console.log("=== Paired snapshot ===", paired);

    this.closestElement.set(paired);
  }
}