import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatEntity } from '@app/@shared/base-models/base-stats.model';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-espn-stats-table',
  templateUrl: './espn-stats-table.component.html',
  styleUrls: ['./espn-stats-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EspnStatsTableComponent implements OnChanges, AfterViewInit {
  @Input() data: any[];
  @Input() dataColumns: any[];
  @Input() headers: string[];
  @Input() ariaLabel: string | null = null;
  @Input() statsMap: Record<string, StatEntity>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Output() sortChanged = new EventEmitter<Sort>();
  @Output() paginatorChanged = new EventEmitter<PageEvent>();

  readonly StatType = StatTypePeriodId;
  readonly TableColumnDataType = TableColumnDataType;

  dataSource: MatTableDataSource<BaseballPlayer>;
  isLoading$ = new BehaviorSubject(false);

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
    this.isLoading$.next(true);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.dataSource.sortingDataAccessor = (player, stat) => cellDataAccessor(player, stat);

    if (this.dataSource.data.length > 0) {
      this.isLoading$.next(false);
    }
  }
}
