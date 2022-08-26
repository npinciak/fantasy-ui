import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { BaseStatsProperties, StatTypePeriodId } from '@app/espn/models/espn-stats.model';

@Component({
  selector: 'app-espn-stats-table',
  templateUrl: './espn-stats-table.component.html',
  styleUrls: ['./espn-stats-table.component.scss'],
})
export class EspnStatsTableComponent implements OnChanges, AfterViewInit {
  @Input() data: any[];
  @Input() dataColumns: any[];
  @Input() headers: string[];
  @Input() ariaLabel: string | null = null;
  @Input() statsMap: Record<string, BaseStatsProperties>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Output() sortChanged = new EventEmitter<Sort>();
  @Output() paginatorChanged = new EventEmitter<PageEvent>();

  readonly StatType = StatTypePeriodId;
  readonly TableColumnDataType = TableColumnDataType;

  dataSource: MatTableDataSource<BaseballPlayer>;

  constructor() {
    this.dataSource = new MatTableDataSource<BaseballPlayer>();
  }

  ngOnChanges(changes: SimpleChanges): void {
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
