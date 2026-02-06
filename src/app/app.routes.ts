import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'user-detail/:dni', loadComponent: () => import('./pages/user-detail/user-detail.component').then(m => m.UserDetailComponent) },
      { path: 'knowledge', loadComponent: () => import('./pages/KnowledgeCatalog/KnowledgeCatalogComponent').then(m => m.KnowledgeCatalogComponent) },
      { path: 'simulator', loadComponent: () => import('./pages/simulator/simulator.component').then(m => m.SimulatorComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
