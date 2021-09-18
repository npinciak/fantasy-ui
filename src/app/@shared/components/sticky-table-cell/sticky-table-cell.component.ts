import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-table-cell',
  templateUrl: './sticky-table-cell.component.html',
  styles: ['.sticky-cell { min-width: 200px; }'],
})
export class StickyTableCellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
