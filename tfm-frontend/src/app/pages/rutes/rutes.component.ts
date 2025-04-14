import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { RutesService, Ruta } from '../../services/rutes.service';
import { UserItemStatusService, UserItemStatus } from '../../services/user-item-status.service';

@Component({
  standalone: true,
  selector: 'app-rutes',
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './rutes.component.html',
  styleUrls: ['./rutes.component.scss'],
})
export class RutesComponent implements OnInit {
  rutes: Ruta[] = [];
  hoveredRuta: number | null = null;
  userStatuses: UserItemStatus[] = [];

  constructor(
    private rutesService: RutesService,
    private userItemStatusService: UserItemStatusService
  ) {}

  ngOnInit(): void {
    // Carrega totes les rutes
    this.rutesService.getRutes().subscribe({
      next: (data) => {
        this.rutes = data;
      },
      error: (err) => console.error('Error carregant rutes:', err),
    });

    // Carrega estats de l'usuari
    this.userItemStatusService.getUserStatuses().subscribe((statuses) => {
      this.userStatuses = statuses;
    });
  }

  toggleStatus(rutaId: number, status: 'wishlist' | 'done') {
    const isActive = this.isActive(rutaId, status);
    const action = isActive ? 'remove' : 'add';

    this.userItemStatusService
      .toggleStatus(rutaId, 'ruta', status, action)
      .subscribe(() => {
        if (action === 'add') {
          this.userStatuses.push({ item_id: rutaId, item_type: 'ruta', status, id: 0, user_id: 0, created_at: '' });
        } else {
          this.userStatuses = this.userStatuses.filter(
            (s) => !(s.item_id === rutaId && s.item_type === 'ruta' && s.status === status)
          );
        }
      });
  }

  isActive(rutaId: number, status: 'wishlist' | 'done') {
    return this.userStatuses.some(
      (s) => s.item_id === rutaId && s.item_type === 'ruta' && s.status === status
    );
  }

  isWishlisted(rutaId: number): boolean {
    return this.isActive(rutaId, 'wishlist');
  }
}
