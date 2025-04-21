import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 
  private user: any = null;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.user = response.user;
      })
    );
  }
  
  getCurrentUser() {
    return this.user;
  }

  register(data: { nom: string; email: string; contrasenya: string; contrasenya_confirmation: string }) {
    return this.http.post<{ token: string; user: any }>(
      `${this.apiUrl}/register`,
      data
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
