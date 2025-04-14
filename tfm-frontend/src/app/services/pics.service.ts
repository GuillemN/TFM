import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from './rutes.service';

export interface Pic {
  id_pic: number;
  nom: string;
  altitud: number;
  descripcio: string;
  coordenades: string;
  imatge: string;
}

@Injectable({ providedIn: 'root' })
export class PicsService {
  private apiUrl = 'http://localhost:8000/api/pics';

  constructor(private http: HttpClient) {}

  getPics(): Observable<Pic[]> {
    return this.http.get<Pic[]>(this.apiUrl);
  }

  getPicById(id: number): Observable<Pic> {
    return this.http.get<Pic>(`${this.apiUrl}/${id}`);
  }

  getRutesPerPic(id: number): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(`${this.apiUrl}/${id}/rutes`);
  }
}
