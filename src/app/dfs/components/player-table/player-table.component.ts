import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { NflDfsPlayerTableData } from '@app/dfs/nfl/models/nfl-player.model';

enum FilterType {
  team,
  pos,
  name,
  statGroup,
  salary,
}

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
})
export class PlayerTableComponent implements AfterViewInit, OnChanges {
  @Input() data: NflDfsPlayerTableData[];
  @Input() dataRows: any[];
  @Input() dataHeaders: any[];

  @Input() teamMap: any;
  @Input() teamFilter: string;
  @Input() positionFilter: string;
  @Input() statGroupFilter: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  readonly TableColumnDataType = TableColumnDataType;
  filter = '';
  filterTypeSelected: FilterType;
  readonly filterType = FilterType;

  dataSource: MatTableDataSource<unknown>;

  constructor() {
    this.dataSource = new MatTableDataSource<unknown>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.dataSource.data = changes.data.currentValue;
    }

    if (changes.teamFilter) {
      this.dataSource.filter = changes.teamFilter.currentValue;
      this.filterTypeSelected = FilterType.team;
    }

    if (changes.positionFilter) {
      this.dataSource.filter = changes.positionFilter.currentValue;
      this.filterTypeSelected = FilterType.pos;
    }

    if (changes.statGroupFilter) {
      this.dataSource.filter = changes.statGroupFilter.currentValue;
      this.filterTypeSelected = FilterType.statGroup;
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
    this.dataSource.filterPredicate = this.dataSourceFilter();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  // filterChange(change: { value: string }, filterType: FilterType) {
  //   this.filter = change.value;
  //   this.filterTypeSelected = filterType;
  //   this.dataSource.filter = change.value;
  // }

  dataSourceFilter(): (data: NflDfsPlayerTableData, filterVal: string) => boolean {
    return (data, filterVal): boolean => {
      // if (filterVal === '') {
      //   return true;
      // }

      let textMatches = false;

      if (this.filterTypeSelected in FilterType) {
        switch (this.filterTypeSelected) {
          case FilterType.name:
            if (data.name) {
              textMatches = data.name.includes(filterVal);
            }
            break;
          case FilterType.team:
            if (data.teamId) {
              textMatches = data.teamId === filterVal;
            }
            break;
          case FilterType.pos:
            if (data.position) {
              textMatches = data.position.includes(filterVal);
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
      }

      return textMatches;
    };
  }
}
