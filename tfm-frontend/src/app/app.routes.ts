import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RefugisComponent } from './pages/refugis/refugis.component';
import { RutesComponent } from './pages/rutes/rutes.component';
import { ViesFerradesComponent } from './pages/vies-ferrades/vies-ferrades.component';  


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { path: 'refugis', component: RefugisComponent, canActivate: [AuthGuard] },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent), canActivate: [AuthGuard] },
  {path: 'refugis/:id',loadComponent: () => import('./pages/refugi-detall/refugi-detall.component').then(m => m.RefugiDetallComponent),canActivate: [AuthGuard]},
  { path: 'refugi/:id', loadComponent: () => import('./pages/refugi-detall/refugi-detall.component').then(m => m.RefugiDetallComponent), canActivate: [AuthGuard] },
  { path: 'rutes', component: RutesComponent, canActivate: [AuthGuard] },
  { path: 'rutes/:id', loadComponent: () => import('./pages/ruta-detall/ruta-detall.component').then(m => m.RutaDetallComponent),canActivate: [AuthGuard] },
  { path: 'pics', loadComponent: () => import('./pages/pics/pics.component').then(m => m.PicsComponent), canActivate: [AuthGuard] },
  { path: 'pics/:id', loadComponent: () => import('./pages/pic-detall/pic-detall.component').then(m => m.PicDetallComponent), canActivate: [AuthGuard] },
  { path: 'estanys', loadComponent: () => import('./pages/estanys/estanys.component').then(m => m.EstanysComponent), canActivate: [AuthGuard] },
  { path: 'estanys/:id', loadComponent: () => import('./pages/estany-detall/estany-detall.component').then(m => m.EstanyDetallComponent), canActivate: [AuthGuard] },
  { path: 'vies-ferrades', component: ViesFerradesComponent, canActivate: [AuthGuard] },
  { path: 'vies-ferrades/:id', loadComponent: () => import('./pages/vies-ferrades-detall/vies-ferrades-detall.component').then(m => m.ViesFerradesDetallComponent), canActivate: [AuthGuard] },

  // Sempres ha de ser l'ultima
  { path: '**', redirectTo: 'login' }
];