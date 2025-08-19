import { Component, ViewChild, signal } from "@angular/core";
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
import { HistoryServiceTs } from "../../../services/history.service";
import { HttpClient } from "@angular/common/http";
import { Loading } from "../../lotties/loading/loading";
import { MatAutocompleteModule } from '@angular/material/autocomplete';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

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
  elemts = signal<any[]>([]);
  inputValue: any;
  filteredRes: any[] = [];


  constructor(private http: HttpClient) {

    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chartdata",
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May",
          "Jun", "Jul", "Aug", "Sep"
        ]
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
  }
  
}
