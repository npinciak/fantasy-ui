import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { FOOTBALL_ROSTER_HEADERS_BY_LINEUP_SLOT, FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT } from '../../consts/fantasy-football-table.const';

import { BASIC_FOOTBALL_LINEUP_SLOT_FILTER_OPTIONS, FOOTBALL_LINEUP_MAP, FootballLineupSlot, NFL_STATS_MAP } from '@sports-ui/ui-sdk/espn';
import { FOOTBALL_STATS_FILTER } from '../../consts/stats-filters.const';
import { FantasyFootballFreeAgentsFilterFacade } from '../../facade/fantasy-football-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFacade } from '../../facade/fantasy-football-free-agents.facade';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { FantasyFootballTeamFacade } from '../../facade/fantasy-football-team.facade';

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

  selectedTeamId$ = new BehaviorSubject('10');
  scoringPeriodId$ = new BehaviorSubject('');
  xAxisStat$ = new BehaviorSubject<string>('');
  yAxisStat$ = new BehaviorSubject<string>('');

  selectedLineupSlotId$ = this.freeAgentsFilterFacade.selectedLineupSlotId$;
  scoringPeriodFilterOptions$ = this.footballLeagueFacade.scoringPeriodFilterOptions$;
  teamFilterOptions$ = this.footballTeamFacade.teamFilterOptions$;

  tableData$ = combineLatest([this.freeAgentsFacade.freeAgentsStats$, this.scoringPeriodId$]).pipe(
    map(([getFreeAgentStats, scoringPeriodId]) => getFreeAgentStats(scoringPeriodId))
  );

  tableDataWithTeams$ = combineLatest([
    this.freeAgentsFacade.compareTeamAndFreeAgentList$,
    this.scoringPeriodId$,
    this.selectedTeamId$,
  ]).pipe(map(([compareTeamAndFreeAgentList, scoringPeriodId, teamId]) => compareTeamAndFreeAgentList(teamId, scoringPeriodId)));

  freeAgentsScatter$ = combineLatest([
    this.freeAgentsFacade.freeAgentsScatter$,
    this.scoringPeriodId$,
    this.yAxisStat$,
    this.xAxisStat$,
  ]).pipe(
    map(([getFreeAgentsScatter, scoringPeriodId, yAxisStat, xAxisStat]) => getFreeAgentsScatter(scoringPeriodId, yAxisStat, xAxisStat))
  );

  tableConfig$ = combineLatest([this.selectedLineupSlotId$]).pipe(
    map(([slotId]) => ({
      rows: FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[slotId],
      headers: FOOTBALL_ROSTER_HEADERS_BY_LINEUP_SLOT[slotId],
    }))
  );

  constructor(
    readonly footballTeamFacade: FantasyFootballTeamFacade,
    readonly footballLeagueFacade: FantasyFootballLeagueFacade,
    readonly freeAgentsFacade: FantasyFootballFreeAgentsFacade,
    readonly freeAgentsFilterFacade: FantasyFootballFreeAgentsFilterFacade
  ) {}

  ngOnInit(): void {}

  scoringPeriodIdChange(val: string) {
    this.scoringPeriodId$.next(val);
  }

  onLineupFilterSlotIdChange(lineupSlotId: FootballLineupSlot) {
    this.freeAgentsFilterFacade.setLineupSlotId(lineupSlotId);
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
}
