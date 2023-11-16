import { Component, OnInit } from '@angular/core';
import {
  BASIC_FOOTBALL_LINEUP_SLOT_FILTER_OPTIONS,
  FOOTBALL_LINEUP_MAP,
  INJURY_STATUS_FILTER,
  NFL_STATS_MAP,
} from '@sports-ui/ui-sdk/espn';
import { PLAYER_AVAILABILITY_FILTER, PLAYER_AVAILABILITY_STATUS, PlayerAvailabilityStatus } from '@sports-ui/ui-sdk/espn-client';
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { FOOTBALL_STATS_FILTER } from '../../consts/stats-filters.const';
import { FantasyFootballFreeAgentsFilterFacade } from '../../facade/fantasy-football-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFacade } from '../../facade/fantasy-football-free-agents.facade';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballTeamFacade } from '../../facade/fantasy-football-team.facade';
import { FantasyFootballScoringPeriod } from '../../fantasy-football-scoring-period';

@Component({
  selector: 'app-football-free-agents',
  templateUrl: './football-free-agents.component.html',
})
export class FootballFreeAgentsComponent implements OnInit {
  readonly FOOTBALL_STATS_MAP = NFL_STATS_MAP;
  readonly FOOTBALL_STAT_PERIOD_FILTER_OPTIONS = [];
  readonly FOOTBALL_LINEUP_SLOT_MAP = FOOTBALL_LINEUP_MAP;
  readonly LINEUP_SLOTS = BASIC_FOOTBALL_LINEUP_SLOT_FILTER_OPTIONS;
  readonly FOOTBALL_STATS_FILTER = FOOTBALL_STATS_FILTER;

  readonly INJURY_STATUS_FILTER = INJURY_STATUS_FILTER;
  readonly PLAYER_AVAILABILITY_FILTER = PLAYER_AVAILABILITY_FILTER;

  selectedTeamId$ = new BehaviorSubject('10');
  scoringPeriodId$ = new BehaviorSubject(FantasyFootballScoringPeriod.season('2023'));
  xAxisStat$ = new BehaviorSubject<string>('');
  yAxisStat$ = new BehaviorSubject<string>('');

  selectedLineupSlotId$ = this.freeAgentsFilterFacade.selectedLineupSlotIds$;

  selectedPlayerAvailability$ = new BehaviorSubject<string>(PLAYER_AVAILABILITY_STATUS.FreeAgent);

  scoringPeriodFilterOptions$ = this.footballLeagueFacade.scoringPeriodFilterOptions$;
  teamFilterOptions$ = this.footballTeamFacade.teamFilterOptions$;

  // TODO: fix this with freeAgentsFacade.compareTeamAndFreeAgentList$
  tableData$ = this.freeAgentsFacade.freeAgentsStats$;

  tableConfig$ = combineLatest([this.selectedLineupSlotId$]).pipe(
    map(([slotId]) => ({
      rows: [], // FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[slotId],
      headers: [], //FOOTBALL_ROSTER_HEADERS_BY_LINEUP_SLOT[slotId],
    }))
  );

  constructor(
    readonly footballTeamFacade: FantasyFootballTeamFacade,
    readonly footballLeagueFacade: FantasyFootballLeagueFacade,
    readonly freeAgentsFacade: FantasyFootballFreeAgentsFacade,
    readonly freeAgentsFilterFacade: FantasyFootballFreeAgentsFilterFacade
  ) {}

  ngOnInit(): void {}

  async scoringPeriodIdChange(val: string) {
    this.scoringPeriodId$.next(val);

    const leagueId = this.footballLeagueFacade.leagueId!;

    await firstValueFrom(this.freeAgentsFilterFacade.toggleScoringPeriodIds([val]));
    await firstValueFrom(this.freeAgentsFacade.fetchFreeAgents(leagueId));
  }

  async onLineupFilterSlotIdChange(lineupSlotId: any): Promise<void> {
    await firstValueFrom(this.freeAgentsFilterFacade.toggleLineupSlotIds([lineupSlotId]));
    await firstValueFrom(this.freeAgentsFacade.fetchFreeAgents(this.footballLeagueFacade.leagueId!));
  }

  onAxisXChange(val: string) {
    this.xAxisStat$.next(val);
  }

  onAxisYChange(val: string) {
    this.yAxisStat$.next(val);
  }

  onTeamFilterOptionChange(val: string) {
    this.selectedTeamId$.next(val);
  }

  onPlayerAvailabilityChange(val: PlayerAvailabilityStatus): void {
    this.selectedPlayerAvailability$.next(val);
  }
}
