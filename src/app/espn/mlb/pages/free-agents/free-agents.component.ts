import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { MLB_STATS_MAP, STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { Stat, StatList } from '../../models/mlb-stats.model';

@Component({
  selector: `app-free-agents`,
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.scss'],
})
export class FreeAgentsComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly STAT_PERIOD_FILTER_OPTIONS = STAT_PERIOD_FILTER_OPTIONS;
  readonly statList = StatList;
  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  teamDynamicScatterChartData: any;
  freeAgentDynamicScatterChartData: any;
  freeAgentDynamicLineChartData: any;

  scoringPeriodId: string = '002022';

  selectedStat = Stat.AB;

  constructor(
    private activatedRoute: ActivatedRoute,
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {}

  ngOnInit(): void {
    this.fantasyBaseballFreeAgentsFacade.fetchFreeAgents(this.leagueId, this.scoringPeriodId);
  }

  scoringPeriodIdChange(change: MatSelectChange): void {
    this.scoringPeriodId = change.value;
  }

  statFilterChange(stat: any): void {
    this.selectedStat = stat;
  }
}
