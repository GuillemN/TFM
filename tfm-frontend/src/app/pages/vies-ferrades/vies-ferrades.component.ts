import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CampFiltre } from '../../components/filtre/filtre-config';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { UserItemStatusService } from '../../services/user-item-status.service';
import { RouterModule } from '@angular/router';
import { ViesFerradesService, ViaFerrada } from '../../services/vies-ferrades.service';

@Component({
  standalone: true,
  selector: 'app-vies-ferrades',
  imports: [CommonModule, NavbarComponent, FooterComponent, FiltreComponent, RouterModule],
  templateUrl: './vies-ferrades.component.html',
  styleUrls: ['./vies-ferrades.component.scss'],
})
export class ViesFerradesComponent implements OnInit {
  vies: ViaFerrada[] = [];
  viesOriginals: ViaFerrada[] = [];
  filtreCamps: CampFiltre[] = [
    {
      clau: 'parroquia',
      etiqueta: 'Parròquia',
      tipus: 'select',
      opcions: [
        'Canillo',
        'Encamp',
        'Ordino',
        'La Massana',
        'Andorra la Vella',
        'Sant Julià de Lòria',
        'Escaldes-Engordany',
      ],
    },
    {
      clau: 'dificultat',
      etiqueta: 'Dificultat',
      tipus: 'select',
      opcions: [
        'K1',
        'K2',
        'K3',
        'K4',
      ],
    },
  ];
  hoveredVia: number | null = null;
  userStatuses: any[] = [];

  constructor(
    private viesFerradesService: ViesFerradesService,
    private userItemStatusService: UserItemStatusService
  ) {}

  ngOnInit(): void {
    this.viesFerradesService.getViesFerrades().subscribe({
      next: (data) => {
        this.viesOriginals = data;
        this.vies = [...data];
      },
      error: (err) => console.error('Error carregant vies ferrades:', err),
    });

    this.userItemStatusService.getUserStatuses().subscribe((statuses) => {
      this.userStatuses = statuses;
    });
  }

  aplicarFiltre(filtres: any) {
    this.vies = this.viesOriginals.filter((via) => {
      if (filtres.parroquia && via.Parroquia !== filtres.parroquia) {
        return false;
      }
      if (filtres.dificultat && !via.dificultat.toLowerCase().includes(filtres.dificultat.toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  toggleStatus(viaId: number, status: 'wishlist' | 'done') {
    const isActive = this.isActive(viaId, status);
    const action = isActive ? 'remove' : 'add';

    this.userItemStatusService
      .toggleStatus(viaId, 'vies_ferrades', status, action)
      .subscribe(() => {
        if (action === 'add') {
          this.userStatuses.push({ item_id: viaId, item_type: 'vies_ferrades', status });
        } else {
          this.userStatuses = this.userStatuses.filter(
            (s) => !(s.item_id === viaId && s.item_type === 'vies_ferrades' && s.status === status)
          );
        }
      });
  }

  isActive(viaId: number, status: 'wishlist' | 'done') {
    return this.userStatuses.some(
      (s) => s.item_id === viaId && s.item_type === 'vies_ferrades' && s.status === status
    );
  }

  isWishlisted(viaId: number): boolean {
    return this.isActive(viaId, 'wishlist');
  }
}
