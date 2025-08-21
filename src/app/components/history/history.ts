import { Component, ViewChild, signal, effect } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Loading } from "../../lotties/loading/loading";
import { MatAutocompleteModule } from '@angular/material/autocomplete';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart & {
    toolbar?: {
      show?: boolean;
      tools?: {
        download?: boolean;
        selection?: boolean;
        zoom?: boolean;
        zoomin?: boolean;
        zoomout?: boolean;
        pan?: boolean;
        reset?: boolean;
      },
      icons?: {
        download?: {
          offsetX?: number;
          offsetY?: number;
          customIcon?: string;
        };
      };
    }
  }
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
}

@Component({
  selector: "app-history",
  standalone: true,
  imports: [NgApexchartsModule, MatFormField, MatLabel, MatSelect, MatOption, FormsModule, Loading, MatInput, MatAutocompleteModule],
  templateUrl: "./history.html",
  styleUrls: ["./history.scss"]
})
export class HistoryComponent {

  @ViewChild("chart")
  public chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  selectedId = signal<number | null>(null);
  selectedElement = signal<string | null>(null);
  elemts = signal<any[]>([]);
  inputValue: any;
  filteredRes: any[] = [];
  sensorId = signal<number | null>(null);

  elementsFiltered = signal<any[]>([]);

  elementParams = signal<string[]>([]);

  elmentsFilteredEffect = effect(() => {
    const params = this.elementParams();
    if (params.length > 0) {
      this.fetchElements(params);
      console.log(params)
    }
  });

  combinedEffect = effect(() => {
    const id = this.selectedId();
    const element = this.selectedElement();

    if (id !== null && element !== null) {
      this.filterChartData(id, element);
    }
  });



  constructor(private http: HttpClient) {

    const isDark = localStorage.getItem('isDark') === 'true';

    this.chartOptions = {
      series: [
        {
          name: "Historical Data",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: true,
          tools: {
            download: true,
          },
          icons: {
            download: {
              offsetX: 0,
              offsetY: 0,
              customIcon: `
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="${isDark ? '#000' : '#fff'}" d="M5 20h14v-2H5v2zm7-18L5.33 9h3.67v6h6V9h3.67L12 2z"/>
          </svg>
        `
            }
          }
        }
      },
      title: {
        text: "Historical Data",
        style: {
          color: isDark ? '#fff' : '#000',
        }
      },
      xaxis: {
        categories: []
      }
    };
  }
  ngOnInit() {
    this.fetchData();
  }


  fetchData() {
    this.http.get<any[]>('http://localhost:3000/air-quality/locations').subscribe({
      next: (res) => {
        this.elemts.set(res)
        console.log(this.elemts())
        return this.elemts();
      },
      error: (err) => console.error('Error al obtener datos:', err),
    }
    );
  }

  filter() {
    const input = this.inputValue.toLowerCase();
    this.filteredRes = this.elemts().filter(elemt => elemt.name.toLowerCase().includes(input))
    console.log(this.filteredRes)
  }
  onSelectId(id: number) {
    this.selectedId.set(id);
    console.log(this.selectedId());
    this.fetchSensors();
  }
  onSelectedElement(name: string) {
    this.selectedElement.set(name);
  }

  async fetchElements(selectedParams: string[]) {
    if (!selectedParams || selectedParams.length === 0) return [];

    const encodedNames = selectedParams
      .map(name => encodeURIComponent(name))
      .join(',');

    console.log(encodedNames);

    try {
      const res = await fetch(`http://localhost:3000/chemical-elements/filter?names=${encodedNames}`);
      if (!res.ok) {
        console.error('Error fetching elements:', res.statusText);
        return [];
      }

      const data = await res.json();
      console.log('Chemical elements fetched:', data);

      return data;
    } catch (err) {
      console.error('Fetch error:', err);
      return [];
    }
  }

  fetchSensors() {
    this.http.get<any[]>(`http://localhost:3000/air-quality/sensors/${this.selectedId()}`).subscribe({
      next: (res) => {
        // guarda los sensores con id/displayName
        this.elementsFiltered.set(res.map(sensor => ({
          id: sensor.id,
          displayName: sensor.parameter.displayName || sensor.name
        })));

        // guarda solo los nombres como string[] para usar en fetchElements
        this.elementParams.set(res.map(sensor => sensor.parameter.displayName || sensor.name));

        return res;
      },
      error: (err) => console.error('Error fetching sensors:', err),
    });
  }

  filterChartData(id: number, element: string) {
    this.http.get<any[]>(`http://localhost:3000/air-quality/chart-data/${id}/${element}`).subscribe({
      next: (res) => {
        console.log('Chart data fetched:', res);
        this.chartOptions.series = [{
          name: element,
          data: res.map(item => item.value)
        }];
        this.chartOptions.xaxis = {
          categories: res.map(item => item.datetime)
        };
      },
      error: (err) => console.error('Error fetching chart data:', err),
    });
  }
}
