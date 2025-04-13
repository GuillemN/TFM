import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Refugi {
  id_refugi: number;
  nom: string;
  coordenades: string;
  capacitat: number;
  contacte: string;
  imatge: string;
  parroquies: string;
  lliure: number;
  Altura: number; 
}

@Injectable({
  providedIn: 'root'
})
export class RefugisService {
  private apiUrl = 'http://localhost:8000/api/refugis'; // backend Laravel

  constructor(private http: HttpClient) {}

  getRefugis(): Observable<Refugi[]> {
    return this.http.get<Refugi[]>(this.apiUrl);
  }
  getRefugimap(id: number): Observable<Refugi> {
    return this.http.get<Refugi>(`${this.apiUrl}/${id}`);
  }
  getRefugiById(id: number): Observable<Refugi> {
    return this.http.get<Refugi>(`http://localhost:8000/api/refugis/${id}`);
  }
}
