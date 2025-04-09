import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
  <app-navbar></app-navbar>
  <div class="dashboard-content">
    <h2>Benvingut al teu panell de control!</h2>
  </div>
`  ,styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
