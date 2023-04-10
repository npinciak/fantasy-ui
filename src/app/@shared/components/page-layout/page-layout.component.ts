import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  template: `
    <div class="relative bg-gray-100 md:ml-64">
      <!-- <app-espn-scoreboard></app-espn-scoreboard> -->
      <ng-content select="[statsHeader]"></ng-content>
      <div class="-m-24 mx-auto w-full px-4 md:px-10">
        <ng-content select="[main]"></ng-content>
      </div>
    </div>
  `,
})
export class PageLayoutComponent {}
