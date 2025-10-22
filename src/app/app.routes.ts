import { Routes } from '@angular/router';
import { authGuard } from '@edgeflare/ngx-oidc';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/index/index.component').then((m) => m.IndexComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./pages/auth/callback/callback.component').then((m) => m.CallbackComponent),
  },
  {
    path: 'auth/error',
    loadComponent: () =>
      import('./pages/auth/error/error.component').then((m) => m.AuthErrorComponent),
  },
  {
    path: 'auth/logout/callback',
    loadComponent: () =>
      import('./pages/auth/logout-callback/logout-callback.component').then(
        (m) => m.LogoutCallbackComponent,
      ),
  },
];
