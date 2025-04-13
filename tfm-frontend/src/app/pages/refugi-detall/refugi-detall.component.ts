import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Refugi, RefugisService } from '../../services/refugis.service';
import { MeteoService } from '../../services/meteo.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RefugiMapComponent } from '../refugi-map/refugi-map.component';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-refugi-detall',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent,RefugiMapComponent],
  templateUrl: './refugi-detall.component.html',
  styleUrls: ['./refugi-detall.component.scss']
})
export class RefugiDetallComponent implements OnInit {
  refugi!: Refugi;
  previsio: PrevisioHora[] = [];
  previsioFiltrada: PrevisioHora[] = [];

  constructor(
    private route: ActivatedRoute,
    private refugisService: RefugisService,
    private meteoService: MeteoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.refugisService.getRefugiById(+id).subscribe((data) => {
        this.refugi = data;
        const [lat, lon] = this.refugi.coordenades.split(',').map(Number);
        this.meteoService.getForecast(lat, lon).subscribe({
          next: (resposta) => {
            console.log('Resposta meteo completa:', resposta);
            this.previsio = resposta.previsio;

            if (Array.isArray(this.previsio)) {
              this.previsioFiltrada = this.filtrarMatinsITardes(this.previsio);
            } else {
              console.error('La resposta no conté un array de previsió:', resposta);
              this.previsioFiltrada = [];
            }
          },
          error: (err) => console.error('Error previsió:', err)
        });
      });
    }
  }

  filtrarMatinsITardes(data: PrevisioHora[]): PrevisioHora[] {
    const perDia: { [data: string]: PrevisioHora[] } = {};
  
    for (const entrada of data) {
      if (!entrada.data.includes(' ')) continue;
      const [dia] = entrada.data.split(' ');
      if (!perDia[dia]) perDia[dia] = [];
      perDia[dia].push(entrada);
    }
  
    const diesOrdenats = Object.keys(perDia).sort(); // ordenem per assegurar-nos
    const ultimDia = diesOrdenats[diesOrdenats.length - 1];
  
    const resultats: PrevisioHora[] = [];
  
    diesOrdenats.forEach(dia => {
      const entrades = perDia[dia];
      if (dia === ultimDia) {
        // només una entrada pel darrer dia (escollim matí si hi és, si no tarda)
        const preferida = this.mesProperaAHora(entrades, '09:00:00') || this.mesProperaAHora(entrades, '15:00:00');
        if (preferida) resultats.push(preferida);
      } else {
        const mati = this.mesProperaAHora(entrades, '09:00:00');
        const tarda = this.mesProperaAHora(entrades, '15:00:00');
        if (mati) resultats.push(mati);
        if (tarda) resultats.push(tarda);
      }
    });
  
    return resultats.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }
  
  private mesProperaAHora(entrades: PrevisioHora[], horaObjectiu: string): PrevisioHora | null {
    const [hObj, mObj] = horaObjectiu.split(':').map(Number);
    const targetMinutes = hObj * 60 + mObj;
  
    let millor: PrevisioHora | null = null;
    let millorDiferencia = Infinity;
  
    for (const entrada of entrades) {
      if (!entrada.data.includes(' ')) continue;
      const [, hora] = entrada.data.split(' ');
      const [h, m] = hora.split(':').map(Number);
      const minuts = h * 60 + m;
      const diff = Math.abs(minuts - targetMinutes);
  
      if (diff < millorDiferencia) {
        millor = entrada;
        millorDiferencia = diff;
      }
    }
  
    return millor;
  }

  @ViewChild('carrusel') carruselRef!: ElementRef;

scrollCarrusel(direccio: number) {
  const el = this.carruselRef.nativeElement;
  const ampladaCard = el.querySelector('.previsio-card')?.offsetWidth || 200;
  el.scrollBy({ left: direccio * (ampladaCard + 16), behavior: 'smooth' });
}
  getIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}

interface PrevisioHora {
  data: string;         // format ISO
  temperatura: number;
  pluja: number;
  vent: number;
  icon: string;
  descripcio: string;
}
