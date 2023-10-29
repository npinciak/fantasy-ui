import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { DfsNflThresholds } from '@app/dfs/nfl/consts/stats-threshold.m';
import { NflDfsPlayerTableData } from '@app/dfs/nfl/models/nfl-player.model';
import { FilterType, TableFilter } from '@app/dfs/nfl/models/nfl-table.model';
import { cellDataAccessor } from '@sports-ui/ui-sdk/helpers';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
})
export class PlayerTableComponent implements AfterViewInit, OnChanges {
  @Input() data: NflDfsPlayerTableData[];
  @Input() dataRows: any[];
  @Input() dataHeaders: any[];
  @Input() teamMap: Record<string, string>;
  @Input() filter: string;

  @Output() playerSelectionChange = new EventEmitter<NflDfsPlayerTableData>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  readonly TableColumnDataType = TableColumnDataType;
  readonly matchupThresholdInverse = DfsNflThresholds.matchupThresholdInverse;

  filterTypeSelected: FilterType;
  readonly filterType = FilterType;

  dataSource: MatTableDataSource<NflDfsPlayerTableData>;

  isLoading$ = new BehaviorSubject(false);

  constructor() {
    this.dataSource = new MatTableDataSource<NflDfsPlayerTableData>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.dataSource.data = changes.data.currentValue;
    }
    this.dataSource.filter = changes?.filter?.currentValue;
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.dataSource.sortingDataAccessor = (player, stat) => cellDataAccessor(player, stat);
    this.dataSource.filterPredicate = this.dataSourceFilter();
  }

  dataSourceFilter(): (data: NflDfsPlayerTableData, filterJson: string) => boolean {
    return (data, filterJson): boolean => {
      if (filterJson === '') return true;

      const filter = JSON.parse(filterJson) as TableFilter;

      let match = false;

      switch (filter.filterType) {
        case FilterType.name:
          match = data.name.trim().toLowerCase().includes(filter.value.trim().toLowerCase());
          break;
        case FilterType.team:
          if (filter.value.trim().toLowerCase() === 'all') return true;
          match = data.rgTeamId === filter.value;
          break;
        case FilterType.pos:
          if (filter.value.trim().toLowerCase() === 'all') return true;
          match = data.position.trim().toLowerCase().includes(filter.value.trim().toLowerCase());
          break;
        default:
          break;
      }

      const textMatches =
        data.name.toLowerCase().includes(filter.value.toLowerCase()) ||
        data.position.toLowerCase().includes(filter.value.toLowerCase()) ||
        data.rgTeamId === filter.value;

      return match && textMatches;
    };
  }

  onPlayerSelect(player: NflDfsPlayerTableData) {
    this.playerSelectionChange.emit(player);
  }
}
