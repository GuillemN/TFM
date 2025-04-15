import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from './rutes.service';

export interface Estany {
  id_estany: number;
  nom: string;
  altitud: number;
  imatge: string;
  coordenades: string;
  parroquies: string;
  superficie: number;
  artificial: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstanysService {
  private apiUrl = 'http://localhost:8000/api/estanys';

  constructor(private http: HttpClient) {}

  getEstanys(): Observable<Estany[]> {
    return this.http.get<Estany[]>(this.apiUrl);
  }

  getEstanyById(id: number): Observable<Estany> {
    return this.http.get<Estany>(`${this.apiUrl}/${id}`);
  }
  
  getRutesPerEstany(id: number): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(`http://localhost:8000/api/estanys/${id}/rutes`);
  }
}
