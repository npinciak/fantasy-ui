import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  template: `
    <div class="flex flex-1 flex-col gap-5 sm:flex-row">
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
