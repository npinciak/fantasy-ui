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
  @Input() disabled = false;
  @Input() isMobile = false;

  @Output() filterUpdate = new EventEmitter<number | string>();

<<<<<<< HEAD
  isMobile$ = this.layoutService.isMobile$;

  constructor(private layoutService: LayoutService) {}
=======
  constructor() {}
>>>>>>> a539abaf408e10d5944de3ab1a263b99cbacab74
}
