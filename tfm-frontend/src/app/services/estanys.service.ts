import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estany {
  id_estany: number;
  nom: string;
  altura: number;
  imatge: string;
  coordenades: string;
  parroquies: string;
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
}
