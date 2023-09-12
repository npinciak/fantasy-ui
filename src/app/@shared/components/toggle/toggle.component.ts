import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
  @Input() title: string;
  @Input() textColor = 'text-gray-900 dark:text-gray-300';
  @Output() selectChange = new EventEmitter<boolean>();

  onSelectChange(isChecked: boolean): void {
    this.selectChange.emit(isChecked);
  }
}
