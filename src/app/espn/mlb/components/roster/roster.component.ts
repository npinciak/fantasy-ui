import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumn, TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MLB_STATS_MAP } from '../../consts/stats.const';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
})
export class RosterComponent implements AfterViewInit, OnChanges {
  @Input() data: BaseballPlayer[];
  @Input() dataColumns: TableColumn[];
  @Input() headers: string[];
  @Input() ariaLabel: string | null = null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Output() sortChanged = new EventEmitter<Sort>();
  @Output() paginatorChanged = new EventEmitter<PageEvent>();

  readonly StatType = StatTypePeriodId;
  readonly TableColumnDataType = TableColumnDataType;

  readonly MLB_STATS_MAP = MLB_STATS_MAP;

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

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.sortChanged.emit(this.sort);
          this.paginatorChanged.emit(this.paginator);

          const pageIndex = this.paginator.pageIndex;
          const pageLimit = this.paginator.pageSize;

          const sortDirection = this.sort.direction;
          const sort = this.sort.active;

          // console.log(sort, sortDirection);
          // console.log(this.paginator);

          // this.sort.start = TableSort.Descending;
          // this.sort.active = Metrics.Spend;
          // this.sort.direction = TableSort.Descending;

          // if (this.sort.active === undefined) {
          //   return this.sortChange.emit();
          // }
          // const offsetFilter = paginationOffset(this.paginator.pageIndex, this.paginator.pageSize);
          // const pageLimit = this.paginator.pageSize;

          // this.storageFacade.updateSortFilter(`${this.sort.active}.${this.sort.direction}`);

          // this.employeeFacade.updatePagination(pageLimit, offsetFilter);
          // this.sortChange.emit();
        })
      )
      .subscribe();
  }

  initTable(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.dataSource.sortingDataAccessor = (player, stat) => cellDataAccessor(player, stat);
  }
}
