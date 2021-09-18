import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FilterType } from '@app/dfs/components/player-table/player-table.component';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class DropdownFilterComponent {
  @Input() title: string;
  @Input() filterItems: string[];
  @Output() filterUpdate = new EventEmitter<MatSelectChange>();

  readonly filterType = FilterType;
}
