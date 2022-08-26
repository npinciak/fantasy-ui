import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { UrlBuilder } from '@app/@shared/url-builder';
import { StatTypePeriodToYear } from '@app/espn/espn-helpers';
import { Store } from '@ngxs/store';
import { SetSeasonId } from '../../actions/mlb.actions';
import { BASEBALL_STAT_PERIOD_FILTER_OPTIONS, BATTER_STATS_LIST, MLB_STATS_MAP, PITCHER_STATS_LIST } from '../../consts/stats.const';
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
  selector: 'app-baseball-team',
  templateUrl: './baseball-team.component.html',
  styleUrls: ['./baseball-team.component.scss'],
})
export class BaseballTeamComponent implements OnInit {
  teamLineup: BaseballPlayer[];

  readonly STAT_PERIOD_FILTER_OPTIONS = BASEBALL_STAT_PERIOD_FILTER_OPTIONS;
  readonly teamId = this.routerFacade.teamId;
  readonly leagueId = this.routerFacade.leagueId;

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
  selectedBatterStatXAxis = Stat.wOBA;
  selectedBatterStatYAxis = Stat.AB;

  selectedPitcherStatXAxis = Stat.SO;
  selectedPitcherStatYAxis = Stat.APP;

  scoringPeriodId = '002022';

  isLiveScore: boolean;
  isBatterScatterChart: boolean;
  isPitcherScatterChart: boolean;

  isLoading$ = this.fantasyBaseballLeagueFacade.isLoading$;

  constructor(
    private store: Store,
    readonly routerFacade: RouterFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballPlayerFacade: FantasyBaseballPlayerFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  onLiveScoringSelectChange(event: MatSlideToggleChange) {
    this.isLiveScore = event.checked;
  }

  onBatterGraphSelectChange(event: MatSlideToggleChange) {
    this.isBatterScatterChart = event.checked;
  }

  onPitcherGraphSelectChange(event: MatSlideToggleChange) {
    this.isPitcherScatterChart = event.checked;
  }

  onScoringPeriodIdChange(val: string): void {
    this.scoringPeriodId = val;
    const seasonId = StatTypePeriodToYear(this.scoringPeriodId);
    this.store.dispatch(new SetSeasonId({ seasonId }));
  }

  onBatterStatXAxisChange(val: any): void {
    this.selectedBatterStatXAxis = val;
  }

  onBatterStatYAxisChange(val: any): void {
    this.selectedBatterStatYAxis = val;
  }

  onPitcherStatXAxisChange(val: any): void {
    this.selectedPitcherStatXAxis = val;
  }

  onPitcherStatYAxisChange(val: any): void {
    this.selectedPitcherStatYAxis = val;
  }

  navigateHome(): void {
    this.router.navigate(this.homeRoute);
  }

  get homeRoute(): string[] {
    return [UrlBuilder.espnMlbBase, `${this.leagueId}`];
  }

  get batterScatterChartTitle(): string {
    return `${this.MLB_STAT_MAP[this.selectedBatterStatXAxis].description} vs ${
      this.MLB_STAT_MAP[this.selectedBatterStatYAxis].description
    }`;
  }

  get pitcherScatterChartTitle(): string {
    return `${this.MLB_STAT_MAP[this.selectedPitcherStatXAxis].description} vs ${
      this.MLB_STAT_MAP[this.selectedPitcherStatYAxis].description
    }`;
  }

  get barChartTitle(): string {
    return this.MLB_STAT_MAP[this.selectedBatterStatXAxis].description;
  }
}