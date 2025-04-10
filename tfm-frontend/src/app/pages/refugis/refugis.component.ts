import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refugis-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refugis.component.html',
  styleUrls: ['./refugis.component.scss']
})
export class RefugisComponent {
  refugis = [
    {
      nom: "Refugi de l'Illa",
      km: 6.2,
      desnivell: 580,
      dificultat: 'Moderada',
      imatge: '/img/refugis/refugi-illa.jpg'
    },
    {
      nom: "Refugi de Comapedrosa",
      km: 4.1,
      desnivell: 850,
      dificultat: 'Alta',
      imatge: '/img/refugis/refugi-comapedrosa.jpg'
    },
    {
      nom: "Refugi de Sorteny",
      km: 3.8,
      desnivell: 300,
      dificultat: 'Fàcil',
      imatge: '/img/refugis/refugi-sorteny.jpg'
    }
  ];
}
