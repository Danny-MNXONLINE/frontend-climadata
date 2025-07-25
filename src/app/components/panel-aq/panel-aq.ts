import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { AirQualityService } from '../../../services/air-quality.service';

@Component({
  selector: 'app-panel-aq',
  imports: [HttpClientModule, CommonModule, MatFormField, MatLabel, MatSelect, MatOption, MatSpinner, FormsModule],
  templateUrl: './panel-aq.html',
  styleUrl: './panel-aq.scss'
})
export class PanelAq {
  constructor(private http: HttpClient, private airQualityService: AirQualityService) { }
  elemts: any[] = [];
  selectedId: number | null = null;
  parameters: any[] = [];

  ngOnInit() {
    this.fetchData();
    console.log("data fetched")
  }

  fetchData() {
    this.http.get('http://localhost:3000/air-quality/locations')
      .subscribe({
        next: (res) => {
          console.log('Datos obtenidos:', res);
          this.elemts = res as any[];
          console.log(this.elemts);
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
  }
  onSelectId(id: number) {
    console.log('🟢 ID seleccionada:', id);
    this.selectedId = id;

    this.airQualityService.fetchFromApiById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res) {
          this.parameters = res;
        } else {
          this.parameters = [];
        }
        console.log(this.parameters);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
