import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumnDataType } from '@app/espn/models/table.model';

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
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnChanges {
  @Input() data: unknown[];
  @Input() dataColumns: any[];
  @Input() headers: any[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  readonly TableColumnDataType = TableColumnDataType;
  filter = '';
  filterTypeSelected: FilterType = 0;
  readonly filterType = FilterType;

  dataSource: MatTableDataSource<unknown>;

  constructor() {
    this.dataSource = new MatTableDataSource<unknown>();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterChange(change: { value: string }, filterType: FilterType) {
    this.filter = change.value;
    this.filterTypeSelected = filterType;
    this.dataSource.filter = change.value;
  }

  dataSourceFilter(): (data: any, filterVal: string) => boolean {
    return (data, filterVal): boolean => {
      if (filterVal === '') {
        return true;
      }

      let textMatches = false;

      if (this.filterTypeSelected in FilterType) {
        switch (this.filterTypeSelected) {
          case FilterType.name:
            if (data.name) {
              textMatches = data.name.includes(filterVal);
            }
            break;
          case FilterType.team:
            if (data.team) {
              textMatches = data.team.includes(filterVal);
            }
            break;
          case FilterType.pos:
            if (data.position) {
              textMatches = data.position.includes(filterVal);
            }
            break;
          case FilterType.statGroup:
            if (data.position) {
              textMatches = data.statGroup.includes(filterVal);
            }
            break;
          default:
            break;
        }
      }

      return textMatches;
    };
  }
}
