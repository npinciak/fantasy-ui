import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterFacade } from '@app/@core/router/router.facade';
import { EspnPlayerDialogComponent } from '@app/espn/components/espn-player-dialog/espn-player-dialog.component';
import { PlayerDialog } from '@app/espn/models/player-dialog-component.model';
import { Store } from '@ngxs/store';
import { FootballPosition, FootballStat, NFL_POSITION_MAP, NFL_STATS_MAP } from '@sports-ui/ui-sdk/espn';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FantasyFootballPlayerNews } from '../../actions/fantasy-football-player-news.actions';
import { FOOTBALL_POSITION_LIST_FILTER } from '../../consts/fantasy-football-position.const';
import { FOOTBALL_ROSTER_HEADERS_BY_POS, FOOTBALL_ROSTER_ROWS_BY_POS } from '../../consts/fantasy-football-table.const';
import { FOOTBALL_STATS_QB } from '../../consts/stats-filters.const';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballPlayerNewsFacade } from '../../facade/fantasy-football-player-news.facade';
import { FantasyFootballTeamFacade } from '../../facade/fantasy-football-team.facade';
import { FantasyFootballScoringPeriod } from '../../fantasy-football-scoring-period';
import { FootballPlayer } from '../../models/football-player.model';
@Component({
  selector: 'app-football-team',
  templateUrl: './football-team.component.html',
})
export class FootballTeamComponent {
  readonly FOOTBALL_STATS_MAP = NFL_STATS_MAP;
  readonly FOOTBALL_POSITION_LIST_FILTER = FOOTBALL_POSITION_LIST_FILTER;
  readonly NFL_POSITION_MAP = NFL_POSITION_MAP;

  readonly FOOTBALL_STAT_PERIOD_FILTER_OPTIONS = FOOTBALL_STATS_QB;

  readonly FOOTBALL_ROSTER_HEADERS_BY_POS = FOOTBALL_ROSTER_HEADERS_BY_POS;
  readonly FOOTBALL_ROSTER_ROWS_BY_POS = FOOTBALL_ROSTER_ROWS_BY_POS;

  isLoading$ = this.footballLeagueFacade.isLoading$;
  teamInfo$ = this.footballTeamFacade.teamInfo$;
  scoringPeriodId$ = new BehaviorSubject(FantasyFootballScoringPeriod.season('2023'));
  selectedPosition$ = new BehaviorSubject(FootballPosition.QB);
  selectedStats$ = new BehaviorSubject(FootballStat.GP);
  teamListLength$ = this.footballTeamFacade.getListLength$;

  statPeriodFilterOptions$ = this.footballLeagueFacade.scoringPeriodFilterOptions$;

  starters$ = this.footballTeamFacade.starters$;

  startersPoints$ = this.footballTeamFacade.startersPoints$;

  bench$ = this.footballTeamFacade.bench$;

  benchPoints$ = this.footballTeamFacade.benchPoints$;

  injuredReserve$ = this.footballTeamFacade.injuredReserve$;
  currentScoringPeriodId$ = this.footballLeagueFacade.currentScoringPeriodId$;

  tableData$ = combineLatest([this.footballTeamFacade.teamStatsByPositionId$, this.scoringPeriodId$, this.selectedPosition$]).pipe(
    map(([teamStatsByPositionId, scoringPeriodId, selectedPosition]) => teamStatsByPositionId(scoringPeriodId, selectedPosition))
  );

  tableConfig$ = combineLatest([this.selectedPosition$]).pipe(
    map(([selectedPosition]) => ({
      rows: FOOTBALL_ROSTER_ROWS_BY_POS[selectedPosition],
      headers: FOOTBALL_ROSTER_HEADERS_BY_POS[selectedPosition],
    }))
  );

  constructor(
    readonly footballPlayerNewsFacade: FantasyFootballPlayerNewsFacade,
    readonly footballLeagueFacade: FantasyFootballLeagueFacade,
    readonly footballTeamFacade: FantasyFootballTeamFacade,
    readonly routerFacade: RouterFacade,
    private dialog: MatDialog,
    private store: Store
  ) {}

  onSelectedPositionChange(val): void {
    this.selectedPosition$.next(Number(val));
  }

  onSelectedStatChange(val): void {
    this.selectedStats$.next(val);
  }

  scoringPeriodIdChange(val): void {
    this.scoringPeriodId$.next(val);
  }

  refreshLeague(): void {
    this.footballLeagueFacade.refreshCurrentLeague();
  }

  async onPlayerClick(player: FootballPlayer): Promise<void> {
    await this.store.dispatch([new FantasyFootballPlayerNews.Fetch({ playerId: player.id })]).toPromise();
    const news = this.footballPlayerNewsFacade.getById(player.id)?.news ?? [];

    const data = { player, news, sport: 'nfl' } as PlayerDialog<FootballPlayer>;

    this.dialog.open(EspnPlayerDialogComponent, { data, height: '500px', width: '800px' });
  }
}
