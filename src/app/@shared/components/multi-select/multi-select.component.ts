import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent implements OnInit {
  @Input() title = '';
  @Input() ariaLabel = '';

  @Input() selectedOption: number | string;
  @Input() filterItems: FilterOptions<number | string>[];
  @Input() disabled = false;

  @Output() filterUpdate = new EventEmitter<number | string>();

  selectionList: SelectionModel<number | string>;

  constructor() {
    this.selectionList = new SelectionModel(true);
  }

  ngOnInit(): void {
    // this.selectionList.changed.pipe(pluck('source', 'selected')).subscribe(selected => console.log(selected));
  }

  get areAllSelected(): boolean {
    return this.filterItems.length === this.selectionList.selected.length;
  }

  onSelectionChange(value: number | string) {
    console.log(this.selectionList.isSelected(value));

    this.filterUpdate.emit(value);
    this.selectionList.toggle(value);
  }
}
