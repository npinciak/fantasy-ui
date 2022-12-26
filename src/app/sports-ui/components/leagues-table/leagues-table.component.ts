import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { ICON_PATH } from '@app/espn/espn.const';
import { FantasySports, FantasySportToLabelMap, LeagueSportToImageLocationMap } from '@app/espn/models/espn-endpoint-builder.model';
import { SportsUiClientLeague } from '@app/sports-ui/models/sports-ui-league.model';

@Component({
  selector: 'app-leagues-table',
  templateUrl: './leagues-table.component.html',
  styleUrls: ['./leagues-table.component.scss'],
})
export class LeaguesTableComponent implements AfterViewInit, OnChanges {
  @Input() data: SportsUiClientLeague[];
  @Input() rows: any[];
  @Input() headers: string[];

  @Output() addLeague = new EventEmitter();
  @Output() navigateToLeague = new EventEmitter<SportsUiClientLeague>();
  @Output() removeLeague = new EventEmitter<string>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  readonly FantasySports = FantasySports;
  readonly ICON_PATH = ICON_PATH;
  readonly FantasySportToLabelMap = FantasySportToLabelMap;
  readonly LeagueSportToImageLocationMap = LeagueSportToImageLocationMap;

  dataSource: MatTableDataSource<SportsUiClientLeague>;

  constructor(private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<SportsUiClientLeague>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.dataSource.data;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.data;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (team, stat) => cellDataAccessor(team, stat);

    this.cdr.detectChanges();
  }

  onNavigateToLeague(league: SportsUiClientLeague) {
    this.navigateToLeague.emit(league);
  }

  onRemoveLeague(id: string) {
    this.removeLeague.emit(id);
  }

  onAddNewLeague() {
    this.addLeague.emit();
  }
}
