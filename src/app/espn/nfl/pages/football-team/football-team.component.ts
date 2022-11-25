import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { LayoutService } from '@app/@shared/services/layout.service';
import { EspnPlayerDialogComponent } from '@app/espn/components/espn-player-dialog/espn-player-dialog.component';
import { FOOTBALL_STAT_PERIOD_FILTER_OPTIONS, YearToStatTypePeriod } from '@app/espn/const/stat-period.const';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FOOTBALL_ROSTER_HEADERS_BY_POS, FOOTBALL_ROSTER_ROWS_BY_POS } from '../../consts/fantasy-football-table.const';
import { NFL_POSITION_MAP } from '../../consts/position.const';
import { FOOTBALL_STATS_MAP } from '../../consts/stats.const';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballTeamFacade } from '../../facade/fantasy-football-team.facade';
import { FootballPlayer } from '../../models/football-player.model';
import { FootballPosition, FOOTBALL_POSITION_LIST_FILTER } from '../../models/football-position.model';

@Component({
  selector: 'app-football-team',
  templateUrl: './football-team.component.html',
  styleUrls: ['./football-team.component.scss'],
})
export class FootballTeamComponent implements OnInit {
  readonly leagueId$ = this.routerFacade.leagueId$;
  readonly teamId$ = this.routerFacade.teamId$;

  readonly FOOTBALL_STATS_MAP = FOOTBALL_STATS_MAP;
  readonly FOOTBALL_POSITION_LIST_FILTER = FOOTBALL_POSITION_LIST_FILTER;
  readonly NFL_POSITION_MAP = NFL_POSITION_MAP;

  readonly FOOTBALL_STAT_PERIOD_FILTER_OPTIONS = FOOTBALL_STAT_PERIOD_FILTER_OPTIONS;

  readonly FOOTBALL_ROSTER_HEADERS_BY_POS = FOOTBALL_ROSTER_HEADERS_BY_POS;
  readonly FOOTBALL_ROSTER_ROWS_BY_POS = FOOTBALL_ROSTER_ROWS_BY_POS;

  readonly FootballPosition = FootballPosition;

  isMobile$ = this.layoutService.isMobile$;

  isLoading$ = this.footballLeagueFacade.isLoading$;

  scoringPeriodId$ = new BehaviorSubject(YearToStatTypePeriod({ periodType: StatTypePeriodId.Season, dateObj: new Date() }));
  selectedPosition$ = new BehaviorSubject(FootballPosition.QB);

  statPeriodFilterOptions$ = this.footballLeagueFacade.statPeriodFilterOptions$;

  starters$ = combineLatest([this.footballTeamFacade.starters$, this.teamId$]).pipe(map(([starters, teamId]) => starters(teamId)));
  startersPoints$ = combineLatest([this.footballTeamFacade.startersPoints$, this.teamId$]).pipe(
    map(([startersPoints, teamId]) => startersPoints(teamId))
  );

  bench$ = combineLatest([this.footballTeamFacade.bench$, this.teamId$]).pipe(map(([bench, teamId]) => bench(teamId)));
  benchPoints$ = combineLatest([this.footballTeamFacade.benchPoints$, this.teamId$]).pipe(
    map(([benchPoints, teamId]) => benchPoints(teamId))
  );

  injuredReserve$ = combineLatest([this.footballTeamFacade.injuredReserve$, this.teamId$]).pipe(
    map(([injuredReserve, teamId]) => injuredReserve(teamId))
  );

  currentScoringPeriodId$ = this.footballLeagueFacade.currentScoringPeriodId$;

  tableData$ = combineLatest([
    this.footballTeamFacade.teamStatsByPositionId$,
    this.scoringPeriodId$,
    this.selectedPosition$,
    this.teamId$,
  ]).pipe(
    map(([teamStatsByPositionId, scoringPeriodId, selectedPosition, teamId]) =>
      teamStatsByPositionId(teamId, scoringPeriodId, selectedPosition)
    )
  );

  tableConfig$ = combineLatest([this.selectedPosition$]).pipe(
    map(([selectedPosition]) => ({
      rows: FOOTBALL_ROSTER_ROWS_BY_POS[selectedPosition],
      headers: FOOTBALL_ROSTER_HEADERS_BY_POS[selectedPosition],
    }))
  );

  constructor(
    readonly footballLeagueFacade: FantasyFootballLeagueFacade,
    readonly footballTeamFacade: FantasyFootballTeamFacade,
    readonly routerFacade: RouterFacade,
    private dialog: MatDialog,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {}

  onSelectedPositionChange(val) {
    this.selectedPosition$.next(Number(val) as unknown as FootballPosition);
  }

  scoringPeriodIdChange(val) {
    this.scoringPeriodId$.next(val);
  }

  refreshLeague() {
    this.footballLeagueFacade.refreshCurrentLeague();
  }

  onPlayerClick(player: FootballPlayer) {
    let dialogRef = this.dialog.open(EspnPlayerDialogComponent, {
      data: {
        player,
      },
      height: '500px',
      width: '800px',
    });
  }
}
