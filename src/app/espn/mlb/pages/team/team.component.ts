import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlBuilder } from '@app/@shared/url-builder';
import { Store } from '@ngxs/store';
import { SetSeasonId } from '../../actions/mlb.actions';
import {
  BATTER_STATS_LIST,
  MLB_STATS_MAP,
  PITCHER_STATS_LIST,
  StatTypePeriodToYear,
  STAT_PERIOD_FILTER_OPTIONS,
} from '../../consts/stats.const';
import {
  BATTER_STATS_HEADERS,
  BATTER_STATS_LIVE_HEADERS,
  BATTER_STATS_LIVE_ROWS,
  BATTER_STATS_ROWS,
  PITCHER_STATS_HEADERS,
  PITCHER_STATS_ROWS,
} from '../../consts/tables.const';
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

  readonly STAT_PERIOD_FILTER_OPTIONS = STAT_PERIOD_FILTER_OPTIONS;
  readonly teamId = this.activatedRoute.snapshot.params.teamId;
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  readonly BATTER_STATS_LIST = BATTER_STATS_LIST;
  readonly PITCHER_STATS_LIST = PITCHER_STATS_LIST;

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  readonly BATTER_STATS_ROWS = BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = BATTER_STATS_HEADERS;
  readonly PITCHER_STATS_ROWS = PITCHER_STATS_ROWS;
  readonly PITCHER_STATS_HEADERS = PITCHER_STATS_HEADERS;
  readonly BATTER_STATS_LIVE_ROWS = BATTER_STATS_LIVE_ROWS;
  readonly BATTER_STATS_LIVE_HEADERS = BATTER_STATS_LIVE_HEADERS;

  selectedPitcherStat = Stat.fip;
  selectedBatterStat = Stat.wOBA;
  scoringPeriodId = '002022';

  isLiveScore: boolean;

  constructor(
    private store: Store,
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

  onScoringPeriodIdChange(val: string): void {
    this.scoringPeriodId = val;
    const seasonId = StatTypePeriodToYear(this.scoringPeriodId);
    this.store.dispatch(new SetSeasonId({ seasonId }));
  }

  onBatterStatChange(val: any): void {
    this.selectedBatterStat = val;
  }

  onPitcherStatChange(val: any): void {
    this.selectedPitcherStat = val;
  }

  navigateHome(): void {
    this.router.navigate(this.homeRoute);
  }

  get homeRoute(): string[] {
    return [UrlBuilder.espnMlbBase, `${this.leagueId}`];
  }
}
