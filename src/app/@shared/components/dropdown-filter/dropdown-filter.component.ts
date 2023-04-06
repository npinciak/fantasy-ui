import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
})
export class DropdownFilterComponent {
  @Input() title = '';
  @Input() ariaLabel = '';

  @Input() selectedOption: number | string;
  @Input() filterItems: FilterOptions<number | string>[];
  @Input() disabled = false;

  @Output() filterUpdate = new EventEmitter<number | string>();

  constructor() {}

  get customElementId() {
    const label = this.ariaLabel.split(' ').join('-');

    return 'filterItems'.concat('-', label);
  }
}
