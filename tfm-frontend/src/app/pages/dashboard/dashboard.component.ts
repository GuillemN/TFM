import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  categories = [
    {
      title: 'Rutes',
      description: 'Millors rutes accessibles a tothom',
      image: '/img/rutes.jpg'
    },
    {
      title: 'Pics',
      description: 'Tots els pics del país',
      image: '/img/pics.jpg'
    },
    {
      title: 'Estanys',
      description: 'Tots els estanys del país',
      image: '/img/estanys.jpg'
    },
    {
      title: 'Refugis',
      description: 'Tots els refugis',
      image: '/img/refugis.jpg'
    },
    {
      title: 'Vies escalada',
      description: 'Les vies i rocòdroms per a tots els nivells',
      image: '/img/vies-escalada.jpg'
    },
    {
      title: 'Vies ferrades',
      description: 'Totes les vies ferrades',
      image: '/img/vies-ferrades.jpg'
    },
  ];
}
