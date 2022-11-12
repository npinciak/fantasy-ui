import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { LayoutService } from '@app/@shared/services/layout.service';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class DropdownFilterComponent {
  @Input() title: string;
  @Input() selectedOption: number | string;
  @Input() filterItems: FilterOptions<number | string>[];
  @Output() filterUpdate = new EventEmitter<number | string>();

  isMobile$ = this.layoutService.isMobile$;

  constructor(private layoutService: LayoutService) {}
}
