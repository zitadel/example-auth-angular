import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-oidc-context');
  protected readonly envVars = {
    domain: (import.meta as any).env['NG_APP_ZITADEL_DOMAIN'],
    clientId: (import.meta as any).env['NG_APP_ZITADEL_CLIENT_ID'],
    callbackUrl: (import.meta as any).env['NG_APP_ZITADEL_CALLBACK_URL'],
    postLogoutUrl: (import.meta as any).env['NG_APP_ZITADEL_POST_LOGOUT_URL']
  };
}
