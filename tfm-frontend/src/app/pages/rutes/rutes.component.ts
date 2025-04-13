import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { RutesService, Ruta } from '../../services/rutes.service';

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

  constructor(private rutesService: RutesService) {}

  ngOnInit(): void {
    this.rutesService.getRutes().subscribe({
      next: (data) => {
        this.rutes = data;
      },
      error: (err) => console.error('Error carregant rutes:', err),
    });
  }
}
