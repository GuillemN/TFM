import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CampFiltre } from './filtre-config';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent {
  @Input() camps: CampFiltre[] = [];
  @Output() filtreCanviat = new EventEmitter<any>();

  valors: { [clau: string]: any } = {};

  aplicarFiltre() {
    this.filtreCanviat.emit(this.valors);
  }
  actualitzaCheckbox(clau: string, valor: string, event: any) {
    if (!this.valors[clau]) this.valors[clau] = [];
  
    if (event.target.checked) {
      this.valors[clau].push(valor);
    } else {
      this.valors[clau] = this.valors[clau].filter((v: string) => v !== valor);
    }
  }
}
