// Importació dels components i serveis necessaris
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
  // Llista de pics per mostrar i còpia original
  pics: Pic[] = [];
  picsOriginals: Pic[] = [];

  // Estat de hover i estats de l’usuari
  hoveredPic: number | null = null;
  userStatuses: any[] = [];

  // Definició dels camps de filtre disponibles
  filtreCamps: CampFiltre[] = [
    {
      clau: 'alçada',
      etiqueta: 'Alçada mínima',
      tipus: 'number',
    },
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
    }
  ];

  // Constructor amb injecció de serveis
  constructor(
    private picsService: PicsService,
    private userItemStatusService: UserItemStatusService
  ) {}

  // Al carregar el component
  ngOnInit(): void {
    // Obtenim els pics
    this.picsService.getPics().subscribe({
      next: (data) => {
        this.picsOriginals = data;
        this.pics = [...data];
      },
      error: (err) => console.error('Error carregant pics:', err),
    });

    // Obtenim els estats dels items de l'usuari
    this.userItemStatusService.getUserStatuses().subscribe((statuses) => {
      this.userStatuses = statuses;
    });
  }

  // Filtre aplicat quan l’usuari canvia els valors
  aplicarFiltre(filtres: any) {
    this.pics = this.picsOriginals.filter((pic) => {
      // 🟡 Filtre per alçada mínima
      if (filtres.alçada && pic.altitud < +filtres.alçada) {
        return false;
      }

      // 🟡 Filtre per parròquia
      if (filtres.parroquia && pic.parroquia !== filtres.parroquia) {
        return false;
      }

      // ✅ Si passa tots els filtres, es manté
      return true;
    });
  }

  // Acció per afegir o eliminar status
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

  // Comprova si l'estat està actiu
  isActive(picId: number, status: 'wishlist' | 'done') {
    return this.userStatuses.some(
      (s) => s.item_id === picId && s.item_type === 'pic' && s.status === status
    );
  }

  // Comprova si el pic està desitjat
  isWishlisted(picId: number): boolean {
    return this.isActive(picId, 'wishlist');
  }
}
