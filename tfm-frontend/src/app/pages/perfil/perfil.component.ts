import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Refugi } from '../../services/refugis.service';
import { UserItemStatusService } from '../../services/user-item-status.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

type ItemArrayKey =
  | 'doneRefugis'
  | 'wishlistRefugis'
  | 'donePics'
  | 'wishlistPics'
  | 'doneEstanys'
  | 'wishlistEstanys'
  | 'doneRutes'
  | 'wishlistRutes';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  doneRefugis: Refugi[] = [];
  wishlistRefugis: Refugi[] = [];
  donePics: any[] = [];
  wishlistPics: any[] = [];
  doneEstanys: any[] = [];
  wishlistEstanys: any[] = [];
  doneRutes: any[] = [];
  wishlistRutes: any[] = [];

  hoveredItem: number | null = null;

  constructor(private statusService: UserItemStatusService) {}

  ngOnInit(): void {
    this.carregarDades();
  }

  // Carrega de fets i voldria fer
  carregarDades() {
    this.statusService.getRefugisByStatus('done').subscribe({
      next: (data) => this.doneRefugis = data,
      error: (err) => console.error('Error carregant refugis fets:', err)
    });

    this.statusService.getRefugisByStatus('wishlist').subscribe({
      next: (data) => this.wishlistRefugis = data,
      error: (err) => console.error('Error carregant refugis desitjats:', err)
    });

    this.statusService.getPicsByStatus('done').subscribe({
      next: (data) => this.donePics = data,
      error: (err) => console.error('Error carregant pics fets:', err)
    });

    this.statusService.getPicsByStatus('wishlist').subscribe({
      next: (data) => this.wishlistPics = data,
      error: (err) => console.error('Error carregant pics desitjats:', err)
    });

    this.statusService.getEstanysByStatus('done').subscribe({
      next: (data) => this.doneEstanys = data,
      error: (err) => console.error('Error carregant estanys fets:', err)
    });

    this.statusService.getEstanysByStatus('wishlist').subscribe({
      next: (data) => this.wishlistEstanys = data,
      error: (err) => console.error('Error carregant estanys desitjats:', err)
    });

    this.statusService.getRutesByStatus('done').subscribe({
      next: (data) => this.doneRutes = data,
      error: (err) => console.error('Error carregant rutes fetes:', err)
    });

    this.statusService.getRutesByStatus('wishlist').subscribe({
      next: (data) => this.wishlistRutes = data,
      error: (err) => console.error('Error carregant rutes desitjades:', err)
    });
  }

  // Esborrar del perfil un element
  toggleStatus(itemId: number, itemType: string, status: 'done' | 'wishlist') {
    this.statusService.toggleStatus(itemId, itemType, status, 'remove').subscribe(() => {
      const key = this.getArrayKey(itemType, status);
      this[key] = (this[key] as any[]).filter(item =>
        this.getItemId(item, itemType) !== itemId
      );
    });
  }

  isWishlisted(itemId: number, itemType: string): boolean {
    const key = this.getArrayKey(itemType, 'wishlist');
    const list = this[key] as any[];

    return list?.some(item => this.getItemId(item, itemType) === itemId);
  }

  private getArrayKey(type: string, status: 'done' | 'wishlist'): ItemArrayKey {
    const map: Record<string, string> = {
      refugi: 'Refugis',
      pic: 'Pics',
      estany: 'Estanys',
      ruta: 'Rutes',
    };
    return (status + map[type]) as ItemArrayKey;
  }

  getFolderName(type: string): string {
    switch (type) {
      case 'ruta': return 'rutes';
      case 'refugi': return 'refugis';
      case 'pic': return 'pics';
      case 'estany': return 'estanys';
      default: return type + 's';
    }
  }

  getItemId(item: any, type: string): number {
    return type === 'ruta' ? item.id : item[`id_${type}`] ?? item.id;
  }

  handleToggleClick(itemId: number, itemType: string, status: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.toggleStatus(itemId, itemType, status as 'done' | 'wishlist');
  }
}
