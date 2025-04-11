import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8000/api/user-item-status'; // Canvia si cal

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
}
