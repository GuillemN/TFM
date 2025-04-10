import { Component, OnInit } from '@angular/core';
import { RefugisService, Refugi } from '../../services/refugis.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  standalone: true,
  selector: 'app-refugis',
  imports: [CommonModule, NavbarComponent,FooterComponent],
  templateUrl: './refugis.component.html',
  styleUrls: ['./refugis.component.scss']
})
export class RefugisComponent implements OnInit {
  refugis: Refugi[] = [];

  constructor(private refugisService: RefugisService) {}

  ngOnInit(): void {
    this.refugisService.getRefugis().subscribe({
      next: (data) => this.refugis = data,
      error: (err) => console.error('Error carregant refugis:', err)
    });
  }
}
