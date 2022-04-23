import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumnDataType } from '@app/espn/models/table.model';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit, OnChanges {
  @Input() data: unknown[];
  @Input() dataColumns: any[];
  @Input() headers: any[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  readonly TableColumnDataType = TableColumnDataType;

  dataSource: MatTableDataSource<unknown>;

  constructor() {
    this.dataSource = new MatTableDataSource<unknown>();
  }

  ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.data.currentValue[0]);
    // console.log(changes.dataColumns);
    if (changes.data) {
      this.dataSource.data = changes.data.currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.dataSource.sortingDataAccessor = (player, stat) => cellDataAccessor(player, stat);
  }
}
