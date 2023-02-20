import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  template: `
    <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700" *ngIf="isLoading"></div>
    <ng-content *ngIf="!isLoading"></ng-content>
  `,
})
export class LoadingSkeletonComponent {
  @Input() isLoading = false;
}
