import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FilterOptions } from '@app/@shared/models/filter.model';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class DropdownFilterComponent {
  @Input() title: string;
  @Input() selectedOption: string;
  @Input() filterItems: FilterOptions[];
  @Output() filterUpdate = new EventEmitter<MatSelectChange>();
}
