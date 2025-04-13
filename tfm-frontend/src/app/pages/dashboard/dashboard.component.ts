import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}
  categories = [
    {
      title: 'Rutes',
      route: '/rutes',
      description: 'Millors rutes accessibles a tothom',
      image: '/img/rutes.jpg'
    },
    {
      title: 'Pics',
      route: '/refugis',
      description: 'Tots els pics del país',
      image: '/img/pics.jpg'
    },
    {
      title: 'Estanys',
      route: '/refugis',
      description: 'Tots els estanys del país',
      image: '/img/estanys.jpg'
    },
    {
      title: 'Refugis',
      route: '/refugis',
      description: 'Tots els refugis',
      image: '/img/refugis.jpg'
    },
    {
      title: 'Vies escalada',
      route: '/refugis',
      description: 'Les vies i rocòdroms per a tots els nivells',
      image: '/img/vies-escalada.jpg'
    },
    {
      title: 'Vies ferrades',
      route: '/refugis',
      description: 'Totes les vies ferrades',
      image: '/img/vies-ferrades.jpg'
    },
  ];
  goToCategory(route: string) { 
    this.router.navigate([route]);
  }
}
