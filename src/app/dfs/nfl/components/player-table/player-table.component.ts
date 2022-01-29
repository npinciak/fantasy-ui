import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { colorScaleTable } from '@app/@shared/helpers/color-blender';
import { sortAccessor } from '@app/@shared/helpers/sort';
import { DailyFantasyPlayersFacade } from '@app/dfs/facade/daily-fantasy-players.facade';
import { TableColumn } from '@app/dfs/mlb/selectors/table.selector';
import { NFLDfsLineupFacade } from '../../facade/nfl-dfs-lineup.facade';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { NFLPlayerTableRow } from '../../models/nfl-player-table-row.model';
import { NFLTableColumn } from '../../models/nfl-table.model';
import { NFL_STAT_GROUP_MAP } from '../../models/stat-group.model';

const threshold = {
  QB: 1,
  RB: 3,
};

enum FilterType {
  team,
  pos,
  name,
  statGroup,
  salary,
}

@Component({
  selector: 'app-nfl-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dfsPlayers: any[] = [];
  @Input() displayColumns: string[] = [];
  @Input() dataColumns: TableColumn[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  filter = '';
  filterTypeSelected: FilterType = 0;
  readonly filterType = FilterType;
  readonly NFL_STAT_GROUP_MAP = NFL_STAT_GROUP_MAP;
  readonly colorScaleTable = colorScaleTable;

  readonly NFLTableColumn = NFLTableColumn;

  salarySliderVal: number;

  selection = new SelectionModel<NFLPlayerTableRow>(true, []);

  sum: number;

  constructor(
    readonly lineupFacade: NFLDfsLineupFacade,
    readonly playerFacade: DailyFantasyPlayersFacade,
    private cdr: ChangeDetectorRef,
    readonly scheduleFacade: ScheduleFacade
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.dataSource.data = this.dfsPlayers;
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.dfsPlayers;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filter = this.filter;
    this.dataSource.sortingDataAccessor = (obj, path) => sortAccessor(obj, path);
    this.dataSource.filterPredicate = this.dataSourceFilter();
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterChange(change: any, filterType: FilterType) {
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

  selectRow(rowData) {
    this.selection.toggle(rowData);

    this.sum = this.selection.selected.reduce((a, b) => a + b.salary, 0);

    this.lineupFacade.addPlayer(rowData);
  }

  get remainingSum() {
    return 50000 - this.sum;
  }

  get remainingPerPlayerSum() {
    const limit = 9;
    const remainingPlayers = limit - this.selectedPlayerList.length;

    return this.remainingSum / remainingPlayers;
  }

  get projectedPoints() {
    return this.selectedPlayerList.reduce((a, b) => a + b.playerProjection.fpts, 0);
  }

  get projectedPointsCeil() {
    return this.selectedPlayerList.reduce((a, b) => a + b.playerProjection.ceil, 0);
  }

  get projectedPointsFloor() {
    return this.selectedPlayerList.reduce((a, b) => a + b.playerProjection.floor, 0);
  }

  get selectedPlayerList(): NFLPlayerTableRow[] {
    return this.selection.selected;
  }
}
