import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// noinspection HtmlDeprecatedAttribute
@Component({
  selector: 'app-logout-callback',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="flex-1 grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6"
        >
          <svg
            class="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Logout successful
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Redirecting in {{ seconds }} seconds...
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            routerLink="/"
            class="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          >
            Return home now
          </a>
        </div>
      </div>
    </main>
  `,
})
export class LogoutCallbackComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  seconds = 10;
  private timer?: number;

  ngOnInit() {
    this.timer = window.setInterval(async () => {
      this.seconds -= 1;
      if (this.seconds <= 0) {
        clearInterval(this.timer);
        await this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
