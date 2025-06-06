import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Refugi } from './refugis.service';

export interface UserItemStatus {
  id: number;
  user_id: number;
  item_id: number;
  item_type: string;
  status: 'wishlist' | 'done';
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserItemStatusService {
  private apiUrl = 'http://localhost:8000/api/user-item-status'; 

  constructor(private http: HttpClient) {}

  toggleStatus(
    itemId: number,
    itemType: string,
    status: 'wishlist' | 'done',
    action: 'add' | 'remove'
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle`, {
      item_id: itemId,
      item_type: itemType,
      status,
      action,
    });
  }

  getUserStatuses(): Observable<UserItemStatus[]> {
    return this.http.get<UserItemStatus[]>(this.apiUrl);
  }
  getRefugisByStatus(status: 'done' | 'wishlist') {
    return this.http.get<Refugi[]>(`http://localhost:8000/api/user/refugis/${status}`);
  }
  getPicsByStatus(status: 'done' | 'wishlist') {
    return this.http.get<any[]>(`http://localhost:8000/api/user/pics/${status}`);
  }
  
  getEstanysByStatus(status: 'done' | 'wishlist') {
    return this.http.get<any[]>(`http://localhost:8000/api/user/estanys/${status}`);
  }
  
  getRutesByStatus(status: 'done' | 'wishlist') {
    return this.http.get<any[]>(`http://localhost:8000/api/user/rutes/${status}`);
  }
}
