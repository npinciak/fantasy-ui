import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '@app/@shared/components/dialog/dialog.service';
import { sortAccessor } from '@app/@shared/helpers/sort';
import { DfsPlayer } from '@app/dfs/mlb/class/player.class';
import { DFS_TOOLTIPS, positionFilter, ThresholdClass, tierFilter } from '@app/dfs/dfs.const';
import { DfsFacade } from '@app/dfs/mlb/facade/dfs.facade';
import { SlatePlayerAttr } from '@app/dfs/mlb/models/slatePlayer.interface';
import { MlbPlayerSlateAttrSelectors } from '@app/dfs/mlb/selectors/playerSlateAttr.selector';
import { TableColumn } from '@app/dfs/mlb/selectors/table.selector';
import { BaseballPlayer } from '@app/espn/mlb/class';

export enum FilterType {
  team,
  pos,
  statGroup,
  name,
  salary,
}

interface FilterOption {
  type: FilterType;
  value: string;
}

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dfsPlayers: DfsPlayer[];
  @Input() tableColumns: TableColumn[];
  @Input() displayColumns: TableColumn[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  readonly filterType = FilterType;
  readonly TOOLTIPS = DFS_TOOLTIPS;
  readonly positionFilter = positionFilter;
  readonly tierFilter = tierFilter;

  dataSource = new MatTableDataSource<DfsPlayer>();
  displayedColumns: string[];
  filter = '';
  filterTypeSelected: FilterType;

  constructor(public dialogService: DialogService, readonly dfsFacade: DfsFacade, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.data = this.dfsPlayers;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (player, stat) => sortAccessor(player, stat);
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = this.dataSourceFilter();
    this.dataSource.filter = this.filter;
    this.cdr.detectChanges();
  }

  ngOnChanges() {
    this.dataSource.data = this.dfsPlayers;
    console.log(this.dfsPlayers[0]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterChange(change: MatSelectChange, filterType: FilterType) {
    this.filter = change.value;
    this.filterTypeSelected = filterType;
    this.dataSource.filter = change.value;
  }

  dataSourceFilter(): (data: DfsPlayer, filterVal: string) => boolean {
    return (data, filterVal): boolean => {
      if (filterVal === '') {
        return true;
      }

      let textMatches = false;

      if (this.filterTypeSelected in FilterType) {
        switch (this.filterTypeSelected) {
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

          default:
            break;
        }
      }

      return textMatches;
    };
  }

  thresholdMUWOBA(val: number): string {
    let thresholdClass = '';
    if (val >= 0.4) {
      thresholdClass = ThresholdClass.excellent;
    } else if (val <= 0.399 && val >= 0.37) {
      thresholdClass = ThresholdClass.great;
    } else if (val <= 0.369 && val >= 0.34) {
      thresholdClass = ThresholdClass.aboveAvg;
    } else if (val <= 0.339 && val >= 0.32) {
      thresholdClass = ThresholdClass.avg;
    } else if (val <= 0.319 && val >= 0.3) {
      thresholdClass = ThresholdClass.belowAvg;
    } else if (val <= 0.299 && val >= 0.279) {
      thresholdClass = ThresholdClass.poor;
    } else if (val <= 0.279) {
      thresholdClass = ThresholdClass.awful;
    }

    return thresholdClass;
  }

  thresholdPlateIq(val: number): string {
    let thresholdClass = '';
    if (val >= 65) {
      thresholdClass = ThresholdClass.excellent;
    } else if (val <= 64.99 && val >= 59) {
      thresholdClass = ThresholdClass.great;
    } else if (val <= 58.99 && val >= 55) {
      thresholdClass = ThresholdClass.aboveAvg;
    } else if (val <= 54.99 && val >= 52) {
      thresholdClass = ThresholdClass.avg;
    } else if (val <= 51.99 && val >= 48) {
      thresholdClass = ThresholdClass.belowAvg;
    } else if (val <= 47.99 && val >= 45) {
      thresholdClass = ThresholdClass.poor;
    } else if (val <= 44.99) {
      thresholdClass = ThresholdClass.awful;
    }

    return thresholdClass;
  }

  thresholdXFIP(val: number): string {
    let thresholdClass = '';
    if (val >= 4.7) {
      thresholdClass = ThresholdClass.awful;
    } else if (val <= 4.69 && val >= 4.4) {
      thresholdClass = ThresholdClass.poor;
    } else if (val <= 4.39 && val >= 4.1) {
      thresholdClass = ThresholdClass.belowAvg;
    } else if (val <= 4.09 && val >= 3.8) {
      thresholdClass = ThresholdClass.avg;
    } else if (val <= 3.79 && val >= 3.5) {
      thresholdClass = ThresholdClass.aboveAvg;
    } else if (val <= 3.49 && val >= 3.1) {
      thresholdClass = ThresholdClass.great;
    } else if (val <= 3.09) {
      thresholdClass = ThresholdClass.excellent;
    }
    return thresholdClass;
  }
}
