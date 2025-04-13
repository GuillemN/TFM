import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RefugisComponent } from './pages/refugis/refugis.component';
import { RutesComponent } from './pages/rutes/rutes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },

  // Protegim la ruta dashboard
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },

  { path: 'refugis', component: RefugisComponent, canActivate: [AuthGuard] },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent), canActivate: [AuthGuard] },
  {path: 'refugis/:id',loadComponent: () => import('./pages/refugi-detall/refugi-detall.component').then(m => m.RefugiDetallComponent),canActivate: [AuthGuard]},
  { path: 'refugi/:id', loadComponent: () => import('./pages/refugi-detall/refugi-detall.component').then(m => m.RefugiDetallComponent), canActivate: [AuthGuard] },
  { path: 'rutes', component: RutesComponent, canActivate: [AuthGuard] },
  { path: 'rutes/:id', loadComponent: () => import('./pages/ruta-detall/ruta-detall.component').then(m => m.RutaDetallComponent),canActivate: [AuthGuard] },

  // ⛔ Aquesta SEMPRE ha d'anar l'última
  { path: '**', redirectTo: 'login' }
];