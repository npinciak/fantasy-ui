import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BaseballPlayer } from '../../models/mlb/class/player.class';
import { rosterColumns, PlayerInfoColumn } from '../../models/mlb/mlb.const';
import { StatTypeId } from '../../models/mlb/mlb.enums';
import { MlbFacade } from '../../store/mlb/mlb.facade';
import { of } from 'rxjs';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit, AfterViewInit {
  @Input() fantasyPlayers: BaseballPlayer[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly StatType = StatTypeId;
  readonly rosterColumns = rosterColumns;
  readonly playerInfoColumn = PlayerInfoColumn;
  readonly tableColumns: string[] = rosterColumns.batters;

  dataSource = new MatTableDataSource<BaseballPlayer>();
  playerNews: any;
  viewOptions: any;

  view: StatTypeId = 0;

  constructor(readonly mlbFacade: MlbFacade) { }

  ngOnInit() {
    // console.log(this.fantasyPlayers[0])

    this.dataSource.data = this.fantasyPlayers;

    this.dataSource.sortingDataAccessor = (player, stat) => this.sortAccessor(player, stat);
  }


  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  };

  updateView = (event: MatButtonToggleChange) => of(); //this.mlbFacade.updateStatType(event.value);

  private sortAccessor(player, stat) {
    return player.playerStats.get(this.view)[stat];
  }

}
