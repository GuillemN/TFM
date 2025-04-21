import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { RutesService, Ruta } from '../../services/rutes.service';
import { UserItemStatusService, UserItemStatus } from '../../services/user-item-status.service';
import { CampFiltre } from '../../components/filtre/filtre-config';
import { FiltreComponent } from '../../components/filtre/filtre.component';

@Component({
  standalone: true,
  selector: 'app-rutes',
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule, FiltreComponent],
  templateUrl: './rutes.component.html',
  styleUrls: ['./rutes.component.scss'],
})
export class RutesComponent implements OnInit {
  rutes: Ruta[] = [];
  rutesOriginals: Ruta[] = [];
  hoveredRuta: number | null = null;
  userStatuses: UserItemStatus[] = [];

  filtreCamps: CampFiltre[] = [
    { clau: 'desnivell', etiqueta: 'Desnivell mínim (m)', tipus: 'number' },
    { clau: 'distancia', etiqueta: 'Distància mínima (km)', tipus: 'number' },
    {
      clau: 'dificultat',
      etiqueta: 'Dificultat',
      tipus: 'select',
      opcions: ['Fàcil', 'Moderada', 'Difícil']
    }
  ];

  constructor(
    private rutesService: RutesService,
    private userItemStatusService: UserItemStatusService
  ) {}

  ngOnInit(): void {
    // Carrega totes les rutes
    this.rutesService.getRutes().subscribe({
      next: (data) => {
        this.rutesOriginals = data;
        this.rutes = [...data];
      },
      error: (err) => console.error('Error carregant rutes:', err),
    });

    // Carrega estats de l'usuari
    this.userItemStatusService.getUserStatuses().subscribe((statuses) => {
      this.userStatuses = statuses;
    });
  }

  aplicarFiltre(filtres: any) {
    this.rutes = this.rutesOriginals.filter((ruta) => {
      if (filtres.desnivell && ruta.desnivell < +filtres.desnivell) return false;
      if (filtres.distancia && ruta.distancia_km < +filtres.distancia) return false;
      if (filtres.dificultat && ruta.dificultat !== filtres.dificultat) return false;
      return true;
    });
  }

  toggleStatus(rutaId: number, status: 'wishlist' | 'done') {
    const isActive = this.isActive(rutaId, status);
    const action = isActive ? 'remove' : 'add';

    this.userItemStatusService
      .toggleStatus(rutaId, 'ruta', status, action)
      .subscribe(() => {
        if (action === 'add') {
          this.userStatuses.push({
            item_id: rutaId,
            item_type: 'ruta',
            status,
            id: 0,
            user_id: 0,
            created_at: ''
          });
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
