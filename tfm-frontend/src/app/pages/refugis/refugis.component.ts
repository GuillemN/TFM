import { Component, OnInit } from '@angular/core';
import { RefugisService, Refugi } from '../../services/refugis.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CampFiltre } from '../../components/filtre/filtre-config';
import { FiltreComponent } from '../../components/filtre/filtre.component';


@Component({
  standalone: true,
  selector: 'app-refugis',
  imports: [CommonModule, NavbarComponent,FooterComponent, FiltreComponent ],
  templateUrl: './refugis.component.html',
  styleUrls: ['./refugis.component.scss']
})
export class RefugisComponent implements OnInit {
  refugis: Refugi[] = [];
  refugisOriginals: Refugi[] = []; 

  constructor(private refugisService: RefugisService) {}

ngOnInit(): void {
  this.refugisService.getRefugis().subscribe({
    next: (data) => {
      this.refugisOriginals = data;
      this.refugis = [...data]; // còpia
    },
    error: (err) => console.error('Error carregant refugis:', err)
  });
}

  filtreCamps: CampFiltre[] = [
    { clau: 'parroquia', etiqueta: 'Parròquia', tipus: 'select', opcions: ['Canillo','Encamp', 'Ordino', 'La Massana','Andorra la Vella', 'Sant Julià de Lòria','Escaldes-Engordany'] },
    { clau: 'capacitat', etiqueta: 'Capacitat mínima', tipus: 'number' },
    //{ clau: 'serveis', etiqueta: 'Serveis', tipus: 'checkbox', opcions: ['wifi', 'dutxa', 'restaurant'] }
  ];

  aplicarFiltre(filtres: any) {
    this.refugis = this.refugisOriginals.filter(refugi => {
      if (filtres.parroquia && refugi.parroquies !== filtres.parroquia) {
        return false;
      }
      if (filtres.capacitat && refugi.capacitat < +filtres.capacitat) {
        return false;
      }
      return true;
    });
  }
}


