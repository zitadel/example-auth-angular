import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { UserManagerSettings } from 'oidc-client-ts';
import { OIDC_CONFIG_TOKEN, AuthService, authzTokenInterceptor } from '@edgeflare/ngx-oidc';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ZITADEL_SCOPES } from './config/scopes';

const oidcConfig: UserManagerSettings = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authority: (import.meta as any).env['NG_APP_ZITADEL_DOMAIN'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client_id: (import.meta as any).env['NG_APP_ZITADEL_CLIENT_ID'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  redirect_uri: (import.meta as any).env['NG_APP_ZITADEL_CALLBACK_URL'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post_logout_redirect_uri: (import.meta as any).env['NG_APP_ZITADEL_POST_LOGOUT_URL'],
  scope: ZITADEL_SCOPES,
  loadUserInfo: true,
  automaticSilentRenew: false,
};

function hasAuthParams(location = window.location): boolean {
  let searchParams = new URLSearchParams(location.search);
  if ((searchParams.get('code') || searchParams.get('error')) && searchParams.get('state')) {
    return true;
  }
  searchParams = new URLSearchParams(location.hash.replace('#', '?'));
  return !!((searchParams.get('code') || searchParams.get('error')) && searchParams.get('state'));
}

function initializeAuth() {
  const authService = inject(AuthService);
  const router = inject(Router);

  return (async () => {
    try {
      // Only handle callback if we have auth params
      if (hasAuthParams()) {
        await authService.signinCallback();
        // Clean the URL before navigating
        window.history.replaceState({}, document.title, window.location.pathname);
        await router.navigate(['/profile']);
        return; // Exit early after handling callback
      }

      // Only handle logout callback on the specific path
      if (window.location.pathname === '/auth/logout/callback') {
        await authService.signoutCallback();
        await router.navigate(['/']);
        return; // Exit early after handling logout
      }

      // For all other pages, just load the existing user (don't try to refresh)
      // The AuthService will handle token refresh automatically when needed
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Only navigate to error page if we were actually trying to authenticate
      if (hasAuthParams() || window.location.pathname === '/auth/logout/callback') {
        await router.navigate(['/auth/error']);
      }
    }
  })();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: OIDC_CONFIG_TOKEN,
      useValue: oidcConfig,
    },
    {
      provide: AuthService,
      useClass: AuthService,
    },
    provideHttpClient(withFetch(), withInterceptors([authzTokenInterceptor])),
    provideAppInitializer(initializeAuth),
    provideRouter(routes),
  ],
};
