import { Component, OnInit } from '@angular/core';
import { RefugisService, Refugi } from '../../services/refugis.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CampFiltre } from '../../components/filtre/filtre-config';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { UserItemStatusService } from '../../services/user-item-status.service'; 
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-refugis',
  imports: [CommonModule, NavbarComponent, FooterComponent, FiltreComponent, RouterModule ],
  templateUrl: './refugis.component.html',
  styleUrls: ['./refugis.component.scss'],
})
export class RefugisComponent implements OnInit {
  refugis: Refugi[] = [];
  refugisOriginals: Refugi[] = [];

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
    { clau: 'altura', etiqueta: 'Altitud mínima', tipus: 'number' },
    {
      clau: 'lliure',
      etiqueta: 'Disponibilitat',
      tipus: 'checkbox',
      opcions: ['Lliure', 'Guardat']
    },

  ];

  hoveredRefugi: number | null = null;
  userStatuses: any[] = [];


  constructor(
    private refugisService: RefugisService,
    private userItemStatusService: UserItemStatusService
  ) {}

  ngOnInit(): void {
    // Carreguem els refugis
    this.refugisService.getRefugis().subscribe({
      next: (data) => {
        this.refugisOriginals = data;
        this.refugis = [...data];
      },
      error: (err) => console.error('Error carregant refugis:', err),
    });

    // Carreguem l'estat de l'usuari
    this.userItemStatusService.getUserStatuses().subscribe((statuses) => {
      this.userStatuses = statuses;
    });
  }

  aplicarFiltre(filtres: any) {
    this.refugis = this.refugisOriginals.filter((refugi) => {
      // Filtre per parròquia
      if (filtres.parroquia && refugi.parroquies !== filtres.parroquia) {
        return false;
      }
  
      // Filtre per altura mínima
      if (filtres.altura && refugi.Altura < +filtres.altura) {
        return false;
      }
  
      // Filtre lliure
      if (
        Array.isArray(filtres.lliure) &&
        filtres.lliure.length > 0 &&
        !filtres.lliure.includes(+refugi.lliure)
      ) {
        return false;
      }
  
      return true;
    });
  }

  toggleStatus(refugiId: number, status: 'wishlist' | 'done') {
    const isActive = this.isActive(refugiId, status);
    const action = isActive ? 'remove' : 'add';

    this.userItemStatusService
      .toggleStatus(refugiId, 'refugi', status, action)
      .subscribe(() => {
        if (action === 'add') {
          this.userStatuses.push({ item_id: refugiId, item_type: 'refugi', status });
        } else {
          this.userStatuses = this.userStatuses.filter(
            (s) => !(s.item_id === refugiId && s.item_type === 'refugi' && s.status === status)
          );
        }
      });
  }

  isActive(refugiId: number, status: 'wishlist' | 'done') {
    return this.userStatuses.some(
      (s) => s.item_id === refugiId && s.item_type === 'refugi' && s.status === status
    );
  }
  isWishlisted(refugiId: number): boolean {
    return this.isActive(refugiId, 'wishlist');
  }
}
