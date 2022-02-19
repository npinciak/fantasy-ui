import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { Store } from '@ngxs/store';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { FantasyBaseballFreeAgentsSelector } from '../../selectors/fantasy-baseball-free-agents.selector';

@Component({
  selector: `app-free-agents`,
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.scss'],
})
export class FreeAgentsComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  teamDynamicScatterChartData: any;
  freeAgentDynamicScatterChartData: any;
  freeAgentDynamicLineChartData: any;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade
  ) {}

  ngOnInit(): void {
    this.fantasyBaseballLeagueFacade.getLeague(this.leagueId);
  }

  filterChange(event: { xAxis: string; yAxis: string }): void {
    this.teamDynamicScatterChartData = this.fantasyBaseballTeamFacade.teamDynamicScatterChartData(event.xAxis ?? '', event.yAxis ?? '');

    this.freeAgentDynamicScatterChartData = this.fantasyBaseballFreeAgentsFacade.freeAgentScatterChartData(
      event.xAxis ?? '',
      event.yAxis ?? '',
      '102022'
    );
  }

  filterChangeFreeAgent(event: { xAxis: string; yAxis: string }): void {
    // this.freeAgentDynamicScatterChartData = this.fantasyBaseballFreeAgentsFacade.freeAgentDynamicScatterChartData(
    //   event.xAxis ?? '',
    //   event.yAxis ?? ''
    // );
    // this.fantasyBaseballFreeAgentsFacade.freeAgentDynamicLineChartData(event.xAxis ?? '');
    this.freeAgentDynamicLineChartData = this.store.selectSnapshot(FantasyBaseballFreeAgentsSelector.freeAgentDynamicLineChartData)(
      event.xAxis,
      '102022'
    );
  }
}
