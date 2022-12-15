import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class DropdownFilterComponent {
  @Input() title: string;
  @Input() selectedOption: number | string;
  @Input() filterItems: FilterOptions<number | string>[];
  @Input() disabled = false;
  @Input() isMobile = false;

  @Output() filterUpdate = new EventEmitter<number | string>();

  constructor() {}
}
