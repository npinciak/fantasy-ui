import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BaseballPlayer } from '@app/espn/mlb/class/baseballPlayer.class';
import { rosterColumns, PlayerInfoColumn } from '@mlb/mlb.const';
import { StatTypeId } from '@mlb/mlb.enums';
import { MlbFacade } from '@mlb/facade/mlb.facade';
import { of } from 'rxjs';
import { MlbTeamFacade } from '../../facade/mlb-team.facade';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit, AfterViewInit {
  @Input() fantasyPlayers: BaseballPlayer[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  readonly StatType = StatTypeId;
  readonly rosterColumns = rosterColumns;
  readonly playerInfoColumn = PlayerInfoColumn;
  readonly tableColumns: string[] = rosterColumns.batters;

  dataSource = new MatTableDataSource<BaseballPlayer>();
  playerNews: any;
  viewOptions: any;

  view: StatTypeId = 0;

  constructor(readonly mlbTeamFacade: MlbTeamFacade, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.data = this.fantasyPlayers;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (player, stat) => this.sortAccessor(player, stat);
    this.cdr.detectChanges();
  }

  private sortAccessor(player, stat) {
    return player.playerStats.get(this.view)[stat];
  }
}
