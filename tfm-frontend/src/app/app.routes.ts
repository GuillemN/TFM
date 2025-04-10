import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RefugisComponent } from './pages/refugis/refugis.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },

  // Protegim la ruta dashboard
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },

  { path: 'refugis', component: RefugisComponent, canActivate: [AuthGuard] },

  // ⛔ Aquesta SEMPRE ha d'anar l'última
  { path: '**', redirectTo: 'login' }
];