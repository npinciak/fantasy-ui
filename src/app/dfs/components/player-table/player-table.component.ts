import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { NflDfsPlayerTableData } from '@app/dfs/nfl/models/nfl-player.model';
import { FilterType, TableFilter } from '@app/dfs/nfl/models/nfl-table.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements AfterViewInit, OnChanges {
  @Input() data: NflDfsPlayerTableData[];
  @Input() dataRows: any[];
  @Input() dataHeaders: any[];

  @Input() teamMap: Record<number, string>;

  @Input() filter: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  readonly TableColumnDataType = TableColumnDataType;

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

    console.log(changes?.filter);
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
      if (filterJson === '') {
        return true;
      }

      const filter: TableFilter = JSON.parse(filterJson);
      let textMatches = false;

      switch (filter.filterType) {
        case FilterType.name:
          if (data.name) {
            textMatches = data.name.includes(filter.value);
          }
          break;
        case FilterType.team:
          if (data.teamId) {
            textMatches = data.teamId === filter.value;
          }
          break;
        case FilterType.pos:
          if (data.position) {
            textMatches = data.position.includes(filter.value);
          }
          break;
        case FilterType.statGroup:
          // if (data.statGroupFilter) {
          //   textMatches = data.statGroup.includes(filterVal);
          // }
          break;
        default:
          break;
      }

      return textMatches;
    };
  }
}
