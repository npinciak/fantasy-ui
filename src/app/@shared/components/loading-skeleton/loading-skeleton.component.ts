import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  template: `
    <ngx-skeleton-loader *ngIf="isLoading"></ngx-skeleton-loader>
    <ng-content *ngIf="!isLoading"></ng-content>
  `,
})
export class LoadingSkeletonComponent {
  @Input() isLoading = false;
}
