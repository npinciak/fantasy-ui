import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/@shared/services/layout.service';
import { FOOTBALL_STAT_PERIOD_FILTER_OPTIONS } from '@app/espn/const/stat-period.const';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FootballTableColumns } from '../../consts/fantasy-football-table.const';
import { FOOTBALL_LINEUP_SLOT_MAP } from '../../consts/lineup.const';
import { FOOTBALL_STATS_MAP } from '../../consts/stats.const';
import { FantasyFootballFreeAgentsFilterFacade } from '../../facade/fantasy-football-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFacade } from '../../facade/fantasy-football-free-agents.facade';
import { FantasyFootballLeagueFacade } from '../../facade/fantasy-football-league.facade';
import { BasicFootballLineupSlotList, FootballLineupSlot } from '../../models/football-lineup.model';

@Component({
  selector: 'app-football-free-agents',
  templateUrl: './football-free-agents.component.html',
  styleUrls: ['./football-free-agents.component.scss'],
})
export class FootballFreeAgentsComponent implements OnInit {
  readonly FOOTBALL_STATS_MAP = FOOTBALL_STATS_MAP;
  readonly FOOTBALL_STAT_PERIOD_FILTER_OPTIONS = FOOTBALL_STAT_PERIOD_FILTER_OPTIONS;
  readonly FOOTBALL_LINEUP_SLOT_MAP = FOOTBALL_LINEUP_SLOT_MAP;
  readonly LINEUP_SLOTS = BasicFootballLineupSlotList;

  scoringPeriodId$ = new BehaviorSubject('');
  selectedLineupSlotId$ = this.freeAgentsFilterFacade.selectedLineupSlotId$;

  statPeriodFilterOptions$ = this.footballLeagueFacade.statPeriodFilterOptions$;

  tableData$ = combineLatest([this.freeAgentsFacade.getFreeAgentsStats$, this.scoringPeriodId$]).pipe(
    map(([getFreeAgentStats, scoringPeriodId]) => getFreeAgentStats(scoringPeriodId))
  );

  tableConfig$ = combineLatest([this.selectedLineupSlotId$]).pipe(
    map(([slotId]) => ({
      rows: FootballTableColumns.RosterRowsByLineupSlot[slotId],
      headers: FootballTableColumns.RosterHeadersByLineupSlot[slotId],
    }))
  );

  isMobile$ = this.layoutService.isMobile$;

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
}
