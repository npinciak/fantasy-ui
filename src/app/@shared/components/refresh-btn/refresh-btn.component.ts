import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-refresh-btn',
  template: `
    <i
      title="Refresh"
      class="fad fa-sync-alt cursor-pointer"
      [ngClass]="(isLoading$ | async) ? 'fa-spin' : ''"
      (click)="onClick()"
      aria-hidden="true"
    ></i>
    <span class="sr-only">Refreshing...</span>
  `,
})
export class RefreshBtnComponent {
  @Input() isLoading = false;
  @Output() refreshButtonClicked = new EventEmitter<void>();

  isLoading$ = new BehaviorSubject<boolean>(false);

  onClick(): void {
    this.isLoading$.next(true);

    this.refreshButtonClicked.emit();

    setTimeout(async () => {
      this.isLoading$.next(false);
    }, 2000);
  }
}
