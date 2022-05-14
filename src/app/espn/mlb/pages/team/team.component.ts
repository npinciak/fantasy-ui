import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlBuilder } from '@app/@shared/url-builder';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { Store } from '@ngxs/store';
import { PatchSeasonId } from '../../actions/mlb.actions';
import { MLB_STATS_MAP, StatTypePeriodToYear, STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballPlayerFacade } from '../../facade/fantasy-baseball-player.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { BaseballPlayer } from '../../models/baseball-player.model';
import { Stat, StatList } from '../../models/mlb-stats.model';

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
  readonly statList = StatList;
  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  selectedPitcherStat = Stat.W;
  selectedBatterStat = Stat.AB;
  scoringPeriodId = '002022';

  isLiveScore: boolean;

  constructor(
    private store: Store,
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballPlayerFacade: FantasyBaseballPlayerFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  get graphTitle() {
    return `${this.selectedBatterStat}`;
  }

  onLiveScoringSelectChange(event: MatSlideToggleChange) {
    this.isLiveScore = event.checked;
  }

  scoringPeriodIdChange(val: string): void {
    this.scoringPeriodId = val;
    const seasonId = StatTypePeriodToYear(this.scoringPeriodId);
    this.store.dispatch(new PatchSeasonId({ seasonId }));
  }

  batterStatChange(val: Stat): void {
    this.selectedBatterStat = val;
  }

  pitcherStatChange(val: Stat): void {
    this.selectedPitcherStat = val;
  }

  navigateHome(): void {
    this.router.navigate(this.homeRoute);
  }

  get homeRoute(): string[] {
    return [`${UrlBuilder.espnMlbBase}`, `${this.leagueId}`];
  }
}
