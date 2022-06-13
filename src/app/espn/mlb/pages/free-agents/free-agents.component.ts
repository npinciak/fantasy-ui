import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BATTING_LINEUP_SLOTS, MLB_LINEUP_MAP, PITCHING_LINEUP_SLOTS } from '../../consts/lineup.const';
import { BATTER_STATS_LIST, MLB_STATS_MAP, PITCHER_STATS_LIST, STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { BATTER_STATS_HEADERS, BATTER_STATS_ROWS, PITCHER_STATS_HEADERS, PITCHER_STATS_ROWS } from '../../consts/tables.const';
import { FantasyBaseballFreeAgentsFilterFacade } from '../../facade/fantasy-baseball-free-agents-filter.facade';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { Stat } from '../../models/mlb-stats.model';

enum PositionTabGroup {
  Batters,
  Pitchers,
}

@Component({
  selector: `app-free-agents`,
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.scss'],
})
export class FreeAgentsComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly STAT_PERIOD_FILTER_OPTIONS = STAT_PERIOD_FILTER_OPTIONS;

  readonly BATTER_STATS_LIST = BATTER_STATS_LIST;
  readonly PITCHER_STATS_LIST = PITCHER_STATS_LIST;

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  readonly BATTER_STATS_ROWS = BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = BATTER_STATS_HEADERS;
  readonly PITCHER_STATS_ROWS = PITCHER_STATS_ROWS;
  readonly PITCHER_STATS_HEADERS = PITCHER_STATS_HEADERS;

  readonly BATTING_LINEUP_SLOTS = BATTING_LINEUP_SLOTS;
  readonly PITCHING_LINEUP_SLOTS = PITCHING_LINEUP_SLOTS;

  readonly MLB_LINEUP_MAP = MLB_LINEUP_MAP;

  teamDynamicScatterChartData: any;
  freeAgentDynamicScatterChartData: any;
  freeAgentDynamicLineChartData: any;

  scoringPeriodId: string = '002022';

  selectedPitcherStat = Stat.ERA;
  selectedBatterStat = Stat.AVG;

  selectedPlayerAvailabilityStatus: SelectionModel<string>;
  tabGroup = PositionTabGroup.Batters;

  constructor(
    private activatedRoute: ActivatedRoute,
    readonly fantasyBaseballFreeAgentsFilterFacade: FantasyBaseballFreeAgentsFilterFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {
    this.selectedPlayerAvailabilityStatus = new SelectionModel(true);
  }

  ngOnInit(): void {
    this.fantasyBaseballFreeAgentsFacade.fetchFreeAgents(this.leagueId, this.scoringPeriodId);
  }

  scoringPeriodIdChange(change: MatSelectChange): void {
    this.scoringPeriodId = change.value;
  }

  onBatterStatChange(val: any): void {
    this.selectedBatterStat = val;
  }

  onPitcherStatChange(val: any): void {
    this.selectedPitcherStat = val;
  }

  onTabChange(val: number) {
    this.tabGroup = val;
  }

  onPlayerAvailabilityStatusChange(event: MatSelectChange) {}

  onLineupFilterSlotIdChange(val: number[]) {
    this.fantasyBaseballFreeAgentsFilterFacade.toggleFilterSlotIds(val, this.leagueId, this.scoringPeriodId);
  }

  get viewingBatters() {
    return this.tabGroup === PositionTabGroup.Batters;
  }

  get playerAvailabilityOptions() {
    return [
      { id: 1, value: 'FREEAGENTS,WAIVERS', label: 'Available' },
      { id: 2, value: 'FREEAGENTS', label: 'Free Agents' },
      { id: 3, value: 'WAIVERS', label: 'Waivers' },
    ];
  }
}
