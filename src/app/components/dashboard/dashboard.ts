import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  data: any;

  constructor(private http: HttpClient) { }

  callFunction() {
    this.fetchData();
    }

  ngOnInit() {
    this.fetchData();
  }
  
  fetchData() {
    const headers = new HttpHeaders({
      'x-api-key': '18ad3e98f226c8e0d63da91aed6e89ae1ef5e2fd38c8e45ba66bb5454807a5e4'
    });
    this.http.get('/openaq/v3/countries', { headers })
      .subscribe({
        next: (res) => {
          console.log('Datos obtenidos:', res);
          this.data = res;
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
  }
}
