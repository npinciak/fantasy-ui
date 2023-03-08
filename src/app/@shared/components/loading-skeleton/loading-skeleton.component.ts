import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  template: `
    <div
      [class.w-24]="sm"
      [class.w-16]="xs"
      class="mb-2 h-2 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
      *ngIf="isLoading"
    ></div>
    <ng-content *ngIf="!isLoading"></ng-content>
  `,
})
export class LoadingSkeletonComponent {
  @Input() isLoading = false;

  @Input() xs = false;
  @Input() sm = false;
  @Input() md = false;
  @Input() lg = false;

  @Input() img = false;
}
