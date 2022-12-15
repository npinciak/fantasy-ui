import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/@shared/services/layout.service';
import { FOOTBALL_STAT_PERIOD_FILTER_OPTIONS } from '@app/espn/const/stat-period.const';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FootballTableColumns } from '../../consts/fantasy-football-table.const';
import { FootballLineup } from '../../consts/lineup.const';
import { FOOTBALL_STATS_FILTER } from '../../consts/stats-filters.const';
import { FOOTBALL_STATS_MAP } from '../../consts/stats.const';
import { FantasyFootballFreeAgentsFilterFacade } from '../../facade/fantasy-football-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFacade } from '../../facade/fantasy-football-free-agents.facade';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { BasicFootballLineupSlotFilterOptions, FootballLineupSlot } from '../../models/football-lineup.model';

@Component({
  selector: 'app-football-free-agents',
  templateUrl: './football-free-agents.component.html',
  styleUrls: ['./football-free-agents.component.scss'],
})
export class FootballFreeAgentsComponent implements OnInit {
  readonly FOOTBALL_STATS_MAP = FOOTBALL_STATS_MAP;
  readonly FOOTBALL_STAT_PERIOD_FILTER_OPTIONS = FOOTBALL_STAT_PERIOD_FILTER_OPTIONS;
  readonly FOOTBALL_LINEUP_SLOT_MAP = FootballLineup.LineupSlotMap;
  readonly LINEUP_SLOTS = BasicFootballLineupSlotFilterOptions;
  readonly FOOTBALL_STATS_FILTER = FOOTBALL_STATS_FILTER;

  selectedTeamId$ = new BehaviorSubject('10');
  scoringPeriodId$ = new BehaviorSubject('');
  xAxisStat$ = new BehaviorSubject<string>('');
  yAxisStat$ = new BehaviorSubject<string>('');

  isMobile$ = this.layoutService.isMobile$;

  selectedLineupSlotId$ = this.freeAgentsFilterFacade.selectedLineupSlotId$;
  statPeriodFilterOptions$ = this.footballLeagueFacade.statPeriodFilterOptions$;

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
      rows: FootballTableColumns.RosterRowsByLineupSlot[slotId],
      headers: FootballTableColumns.RosterHeadersByLineupSlot[slotId],
    }))
  );

  constructor(
    readonly footballLeagueFacade: FantasyFootballLeagueFacade,
    readonly freeAgentsFacade: FantasyFootballFreeAgentsFacade,
    readonly freeAgentsFilterFacade: FantasyFootballFreeAgentsFilterFacade,
    private layoutService: LayoutService
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
}
