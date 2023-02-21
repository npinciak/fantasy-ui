import { Component } from '@angular/core';

@Component({
  selector: 'app-sticky-table-cell',
  template: `
    <div class="min-w-[150px]">
      <ng-content></ng-content>
    </div>
  `,
})
export class StickyTableCellComponent {}
