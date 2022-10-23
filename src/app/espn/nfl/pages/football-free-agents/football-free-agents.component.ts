import { Component, OnInit } from '@angular/core';
import { YearToStatTypePeriod } from '@app/espn/espn-helpers';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
import { BehaviorSubject } from 'rxjs';
import { FootballTableColumns } from '../../consts/fantasy-football-table.const';
import { FOOTBALL_LINEUP_SLOT_MAP } from '../../consts/lineup.const';
import { FOOTBALL_STATS_MAP, FOOTBALL_STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { FantasyFootballFreeAgentsFilterFacade } from '../../facade/fantasy-football-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFacade } from '../../facade/fantasy-football-free-agents.facade';
import { BasicFootballLineupSlotList, FootballLineupSlot } from '../../models/football-lineup.model';
import { FootballPosition } from '../../models/football-position.model';

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

  seasonId = new Date().getFullYear().toString();
  statPeriod = YearToStatTypePeriod(StatTypePeriodId.Season, this.seasonId);
  scoringPeriodId$ = new BehaviorSubject(this.statPeriod);

  lineupSlotId: number = 0;

  positionId = FootballPosition.QB;

  players$ = this.freeAgentsFacade.getFreeAgentsStats$;
  selectedLineupSlotId$ = this.freeAgentsFilterFacade.selectedLineupSlotId$;

  constructor(
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

  tableRows() {
    return slotId => FootballTableColumns.RosterRowsByLineupSlot[slotId];
  }

  tableHeaders() {
    return slotId => FootballTableColumns.RosterHeadersByLineupSlot[slotId];
  }
}
