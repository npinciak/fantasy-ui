import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-refresh-btn',
  template: `<i title="refresh" class="fad fa-sync-alt cursor-pointer" [ngClass]="isLoading ? 'fa-spin' : ''" (click)="onClick()"></i>`,
})
export class RefreshBtnComponent {
  @Input() isLoading = false;
  @Output() refreshButtonClicked = new EventEmitter<void>();

  onClick(): void {
    this.refreshButtonClicked.emit();
  }
}
