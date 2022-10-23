import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YearToStatTypePeriod } from '@app/espn/espn-helpers';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
import { BehaviorSubject } from 'rxjs';
import { FOOTBALL_ROSTER_HEADERS_BY_POS, FOOTBALL_ROSTER_ROWS_BY_POS } from '../../consts/fantasy-football-table.const';
import { NFL_POSITION_MAP } from '../../consts/position.const';
import { FOOTBALL_STATS_MAP, FOOTBALL_STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballTeamFacade } from '../../facade/fantasy-football-team.facade';
import { FootballPosition, FOOTBALL_POSITION_LIST_DEFAULT } from '../../models/football-position.model';

@Component({
  selector: 'app-football-team',
  templateUrl: './football-team.component.html',
  styleUrls: ['./football-team.component.scss'],
})
export class FootballTeamComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  readonly FOOTBALL_STATS_MAP = FOOTBALL_STATS_MAP;
  readonly FOOTBALL_POSITION_LIST = FOOTBALL_POSITION_LIST_DEFAULT;
  readonly NFL_POSITION_MAP = NFL_POSITION_MAP;

  readonly FOOTBALL_STAT_PERIOD_FILTER_OPTIONS = FOOTBALL_STAT_PERIOD_FILTER_OPTIONS;

  readonly FOOTBALL_ROSTER_HEADERS_BY_POS = FOOTBALL_ROSTER_HEADERS_BY_POS;
  readonly FOOTBALL_ROSTER_ROWS_BY_POS = FOOTBALL_ROSTER_ROWS_BY_POS;

  readonly FootballPosition = FootballPosition;

  selectedPosition: FootballPosition = FootballPosition.QB;
  scoringPeriodId: string = YearToStatTypePeriod(StatTypePeriodId.Season, new Date().getFullYear().toString());

  scoringPeriodId$ = new BehaviorSubject('');

  constructor(
    readonly footballLeagueFacade: FantasyFootballLeagueFacade,
    readonly footballTeamFacade: FantasyFootballTeamFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  readonly teamId = this.activatedRoute.snapshot.params.teamId;

  ngOnInit(): void {}

  onSelectedPositionChange(val: FootballPosition) {
    this.selectedPosition = val;
  }

  scoringPeriodIdChange(val) {
    this.scoringPeriodId = val;
    this.scoringPeriodId$.next(val);
  }
}
