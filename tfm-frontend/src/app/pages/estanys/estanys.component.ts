import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { CampFiltre } from '../../components/filtre/filtre-config';
import { EstanysService, Estany } from '../../services/estanys.service';
import { UserItemStatusService } from '../../services/user-item-status.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-estanys',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FiltreComponent, RouterModule],
  templateUrl: './estanys.component.html',
  styleUrls: ['./estanys.component.scss']
})
export class EstanysComponent implements OnInit {
  estanys: Estany[] = [];
  estanysOriginals: Estany[] = [];
  filtreCamps: CampFiltre[] = [
    {
      clau: 'parroquia',
      etiqueta: 'Parròquia',
      tipus: 'select',
      opcions: [
        'Canillo', 'Encamp', 'Ordino', 'La Massana',
        'Andorra la Vella', 'Sant Julià de Lòria', 'Escaldes-Engordany'
      ]
    },
    { clau: 'altitud', etiqueta: 'Altitud mínima', tipus: 'number' }
  ];
  hoveredEstany: number | null = null;
  userStatuses: any[] = [];
rutes: any;

  constructor(
    private estanysService: EstanysService,
    private userItemStatusService: UserItemStatusService
  ) {}

  ngOnInit(): void {
    this.estanysService.getEstanys().subscribe({
      next: (data) => {
        this.estanysOriginals = data;
        this.estanys = [...data];
      },
      error: (err) => console.error('Error carregant estanys:', err)
    });

    this.userItemStatusService.getUserStatuses().subscribe((statuses) => {
      this.userStatuses = statuses;
    });
  }

  aplicarFiltre(filtres: any) {
    this.estanys = this.estanysOriginals.filter((estany) => {
      if (filtres.parroquia && estany.parroquia !== filtres.parroquia) return false;
      if (filtres.altitud && estany.altitud < +filtres.altitud) return false;
      return true;
    });
  }

  toggleStatus(estanyId: number, status: 'wishlist' | 'done') {
    const isActive = this.isActive(estanyId, status);
    const action = isActive ? 'remove' : 'add';

    this.userItemStatusService
      .toggleStatus(estanyId, 'estany', status, action)
      .subscribe(() => {
        if (action === 'add') {
          this.userStatuses.push({ item_id: estanyId, item_type: 'estany', status });
        } else {
          this.userStatuses = this.userStatuses.filter(
            (s) => !(s.item_id === estanyId && s.item_type === 'estany' && s.status === status)
          );
        }
      });
  }

  isActive(estanyId: number, status: 'wishlist' | 'done') {
    return this.userStatuses.some(
      (s) => s.item_id === estanyId && s.item_type === 'estany' && s.status === status
    );
  }

  isWishlisted(estanyId: number): boolean {
    return this.isActive(estanyId, 'wishlist');
  }
}
