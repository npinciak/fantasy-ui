import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { sortAccessor } from '@app/@shared/helpers/sort';
import { PlayerInfoColumn, rosterColumns } from '@mlb/mlb.const';
import { StatTypeId } from '@mlb/mlb.enums';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit, AfterViewInit {
  @Input() fantasyPlayers: BaseballPlayer[];
  @Input() dataColumns: any[];
  @Input() headers: any[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  readonly StatType = StatTypeId;
  readonly rosterColumns = rosterColumns;
  readonly playerInfoColumn = PlayerInfoColumn;
  readonly tableColumns: string[] = rosterColumns.batters;

  dataSource = new MatTableDataSource<BaseballPlayer>();
  playerNews: unknown;
  viewOptions: unknown;

  view: StatTypeId = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.data = this.fantasyPlayers;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (player, stat) => sortAccessor(player, stat);

    this.cdr.detectChanges();
  }
}
