import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-cell-skeleton',
  template: `
    <ngx-skeleton-loader fxLayoutAlign="(default) center" class="p-0 cds-loader" *ngIf="loading"></ngx-skeleton-loader>
    <ng-content *ngIf="!loading"></ng-content>
  `,
})
export class TableCellSkeletonComponent {
  @Input() loading = false;
}
