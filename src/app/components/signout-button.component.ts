import { Component, inject } from '@angular/core';
import { AuthService } from '@edgeflare/ngx-oidc';

@Component({
  selector: 'app-signout-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer"
      (click)="handleSignOut()"
    >
      Sign out
    </button>
  `,
})
export class SignoutButtonComponent {
  private auth = inject(AuthService);

  async handleSignOut() {
    await this.auth.signoutRedirect({
      post_logout_redirect_uri:
        (import.meta as any).env['NG_APP_ZITADEL_POST_LOGOUT_URL'] || window.location.origin + '/',
    });
  }
}
