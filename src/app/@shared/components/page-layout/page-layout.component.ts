import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  template: `
    <div class="flex flex-1 flex-col gap-5 px-4 py-6 sm:flex-row sm:px-0">
      <aside class="order-first sm:w-80">
        <ng-content select="[sidebar]"></ng-content>
      </aside>

      <main class="flex-1">
        <ng-content select="[main]"></ng-content>
      </main>
    </div>
  `,
})
export class PageLayoutComponent {}
