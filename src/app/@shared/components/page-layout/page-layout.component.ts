import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  template: `
    <div class="relative h-full md:ml-64">
      <div class="relative bg-sky-900 pb-32 pt-12 md:pt-32">
        <div class="mx-auto w-full px-4 md:px-10">
          <div>
            <ng-content select="[statsHeader]"></ng-content>
          </div>
        </div>
      </div>
      <div class="-m-24 mx-auto w-full px-4 md:px-10">
        <ng-content select="[main]"></ng-content>
      </div>
    </div>
  `,
})
export class PageLayoutComponent {}
