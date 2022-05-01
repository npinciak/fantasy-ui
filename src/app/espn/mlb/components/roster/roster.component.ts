import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumnDataType } from '@app/espn/models/table.model';
import { BaseballPlayer } from '../../models/baseball-player.model';
import { StatTypePeriodId } from '../../models/mlb-stats.model';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
})
export class RosterComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: BaseballPlayer[];
  @Input() dataColumns: any[];
  @Input() headers: any[];
  @Input() ariaLabel: string | null = null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  readonly StatType = StatTypePeriodId;
  readonly TableColumnDataType = TableColumnDataType;

  dataSource: MatTableDataSource<BaseballPlayer>;

  constructor(private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<BaseballPlayer>();
  }

  ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
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
