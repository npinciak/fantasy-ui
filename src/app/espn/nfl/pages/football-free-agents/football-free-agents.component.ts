import { Component, OnInit } from '@angular/core';
import { YearToStatTypePeriod } from '@app/espn/espn-helpers';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
import { BehaviorSubject } from 'rxjs';
import { FOOTBALL_ROSTER_HEADERS, FOOTBALL_ROSTER_ROWS } from '../../consts/fantasy-football-table.const';
import { FOOTBALL_LINEUP_SLOT_MAP } from '../../consts/lineup.const';
import { FOOTBALL_STATS_MAP, FOOTBALL_STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { FantasyFootballFreeAgentsFacade } from '../../facade/fantasy-football-free-agents.facade';
import { FootballLineupSlotList } from '../../models/football-lineup.model';

@Component({
  selector: 'app-football-free-agents',
  templateUrl: './football-free-agents.component.html',
  styleUrls: ['./football-free-agents.component.scss'],
})
export class FootballFreeAgentsComponent implements OnInit {
  readonly FOOTBALL_ROSTER_ROWS = FOOTBALL_ROSTER_ROWS;
  readonly FOOTBALL_ROSTER_HEADERS = FOOTBALL_ROSTER_HEADERS;
  readonly FOOTBALL_STATS_MAP = FOOTBALL_STATS_MAP;
  readonly FOOTBALL_STAT_PERIOD_FILTER_OPTIONS = FOOTBALL_STAT_PERIOD_FILTER_OPTIONS;
  readonly FOOTBALL_LINEUP_SLOT_MAP = FOOTBALL_LINEUP_SLOT_MAP;
  readonly LINEUP_SLOTS = FootballLineupSlotList;

  seasonId = '2021';
  statPeriod = YearToStatTypePeriod(StatTypePeriodId.Season, this.seasonId);
  scoringPeriodId$ = new BehaviorSubject(this.statPeriod);

  players$ = this.fantasyFootballFreeAgentsFacade.getFreeAgentsStats$;

  constructor(readonly fantasyFootballFreeAgentsFacade: FantasyFootballFreeAgentsFacade) {}

  ngOnInit(): void {}

  scoringPeriodIdChange(val) {
    this.scoringPeriodId$.next(val);
  }

  onLineupFilterSlotIdChange(id) {}
}
