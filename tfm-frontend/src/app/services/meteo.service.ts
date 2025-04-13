import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PrevisioHora {
  data: string;
  temperatura: number;
  pluja: number;
  vent: number;
  icon: string;
  descripcio: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  constructor(private http: HttpClient) {}

  getForecast(lat: number, lon: number): Observable<{ previsio: PrevisioHora[] }> {
    return this.http.get<{ previsio: PrevisioHora[] }>(
      `http://localhost:8000/api/meteo?lat=${lat}&lon=${lon}`
    );
  }
}