import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-refresh-btn',
  templateUrl: './refresh-btn.component.html',
})
export class RefreshBtnComponent {
  @Input() isLoading = false;
  @Output() refreshButtonClicked = new EventEmitter<void>();

  onClick(): void {
    this.refreshButtonClicked.emit();
  }
}
