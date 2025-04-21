import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CampFiltre } from '../../components/filtre/filtre-config';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { RouterModule } from '@angular/router';
import { PicsService, Pic } from '../../services/pics.service';
import { UserItemStatusService } from '../../services/user-item-status.service';

@Component({
  standalone: true,
  selector: 'app-pics',
  imports: [CommonModule, NavbarComponent, FooterComponent, FiltreComponent, RouterModule],
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.scss'],
})
export class PicsComponent implements OnInit {
  pics: Pic[] = [];
  picsOriginals: Pic[] = [];

  hoveredPic: number | null = null;
  userStatuses: any[] = [];

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
      clau: 'alçada',
      etiqueta: 'Altitud mínima',
      tipus: 'number',
    }
  ];

  constructor(
    private picsService: PicsService,
    private userItemStatusService: UserItemStatusService
  ) {}

  ngOnInit(): void {
    this.picsService.getPics().subscribe({
      next: (data) => {
        this.picsOriginals = data;
        this.pics = [...data];
      },
      error: (err) => console.error('Error carregant pics:', err),
    });

    this.userItemStatusService.getUserStatuses().subscribe((statuses) => {
      this.userStatuses = statuses;
    });
  }

  aplicarFiltre(filtres: any) {
    this.pics = this.picsOriginals.filter((pic) => {
      if (filtres.alçada && pic.altitud < +filtres.alçada) {
        return false;
      }

      if (filtres.parroquia && pic.parroquia !== filtres.parroquia) {
        return false;
      }

      return true;
    });
  }

  toggleStatus(picId: number, status: 'wishlist' | 'done') {
    const isActive = this.isActive(picId, status);
    const action = isActive ? 'remove' : 'add';

    this.userItemStatusService.toggleStatus(picId, 'pic', status, action).subscribe(() => {
      if (action === 'add') {
        this.userStatuses.push({ item_id: picId, item_type: 'pic', status });
      } else {
        this.userStatuses = this.userStatuses.filter(
          (s) => !(s.item_id === picId && s.item_type === 'pic' && s.status === status)
        );
      }
    });
  }

  isActive(picId: number, status: 'wishlist' | 'done') {
    return this.userStatuses.some(
      (s) => s.item_id === picId && s.item_type === 'pic' && s.status === status
    );
  }

  isWishlisted(picId: number): boolean {
    return this.isActive(picId, 'wishlist');
  }
}
