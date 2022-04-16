import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { PatchSeasonId } from '../../actions/mlb.actions';
import { StatTypePeriodToYear, STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballPlayerFacade } from '../../facade/fantasy-baseball-player.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { BaseballPlayer } from '../../models/baseball-player.model';
import { Stat } from '../../models/mlb-stats.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  teamLineup: BaseballPlayer[];

  public dataSource = new MatTableDataSource<any>();

  readonly STAT_PERIOD_FILTER_OPTIONS = STAT_PERIOD_FILTER_OPTIONS;
  readonly teamId = this.activatedRoute.snapshot.params.teamId;
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  liveScore: boolean;

  statFilterOption$ = new BehaviorSubject<Stat>(null);
  stats$ = new BehaviorSubject<any[]>(null);
  scoringPeriodId = '002022';

  constructor(
    private store: Store,
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballPlayerFacade: FantasyBaseballPlayerFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

  }

  onLiveScoringSelectChange(event: MatSlideToggleChange) {
    this.liveScore = event.checked;
  }

  scoringPeriodIdChange(change: MatSelectChange): void {
    this.scoringPeriodId = change.value as string;
    const seasonId = StatTypePeriodToYear(this.scoringPeriodId);
    this.store.dispatch(new PatchSeasonId({ seasonId }));
  
  }

  statFilterChange(stat: any): void {
    this.statFilterOption$.next(stat.value);
  }

}
