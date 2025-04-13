import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Refugi } from '../../services/refugis.service';
import { UserItemStatusService } from '../../services/user-item-status.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

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
  hoveredRefugi: number | null = null;

  constructor(private statusService: UserItemStatusService) {}

  ngOnInit(): void {
    this.carregarRefugis();
  }

  carregarRefugis() {
    this.statusService.getRefugisByStatus('done').subscribe({
      next: (data) => this.doneRefugis = data,
      error: (err) => console.error('Error carregant refugis fets:', err)
    });

    this.statusService.getRefugisByStatus('wishlist').subscribe({
      next: (data) => this.wishlistRefugis = data,
      error: (err) => console.error('Error carregant refugis desitjats:', err)
    });
  }

  toggleStatus(refugiId: number, status: 'done' | 'wishlist') {
    this.statusService.toggleStatus(refugiId, 'refugi', status, 'remove').subscribe(() => {
      if (status === 'done') {
        this.doneRefugis = this.doneRefugis.filter(r => r.id_refugi !== refugiId);
      } else {
        this.wishlistRefugis = this.wishlistRefugis.filter(r => r.id_refugi !== refugiId);
      }
    });
  }
  isWishlisted(refugiId: number): boolean {
    return this.wishlistRefugis.some(r => r.id_refugi === refugiId);
  }
}
