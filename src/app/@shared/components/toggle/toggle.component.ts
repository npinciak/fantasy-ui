import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
  @Input() title: string;
  @Output() selectChange = new EventEmitter<boolean>();

  onSelectChange(isChecked: boolean): void {
    this.selectChange.emit(isChecked);
  }
}
