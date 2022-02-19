import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { sortAccessor } from '@app/@shared/helpers/sort';
import { BaseballPlayer } from '../../models/baseball-player.model';
import { StatTypePeriodId } from '../../models/mlb-stats.model';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() fantasyPlayers: BaseballPlayer[];
  @Input() dataColumns: any[];
  @Input() headers: any[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  readonly StatType = StatTypePeriodId;

  dataSource = new MatTableDataSource<BaseballPlayer>();
  playerNews: unknown;
  viewOptions: unknown;

  view: StatTypePeriodId = StatTypePeriodId.regularSeason;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes.fantasyPlayers.currentValue);
    this.initTable();
  }

  ngAfterViewInit(): void {
    this.initTable();

    this.cdr.detectChanges();
  }

  initTable(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.fantasyPlayers;

    this.dataSource.sortingDataAccessor = (player, stat) => sortAccessor(player, stat);
  }
}
