import { Component, Input } from '@angular/core';
import { SignoutButtonComponent } from './signout-button.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SignoutButtonComponent, NgOptimizedImage],
  template: `
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img ngSrc="/app-logo.svg" alt="App Icon" width="40" height="40" class="w-8 h-8" />
            <h1 class="text-xl font-semibold text-gray-900">Demo Application</h1>
          </div>
          @if (isAuthenticated) {
            <app-signout-button />
          }
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Input() isAuthenticated = false;
}
