import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { BehaviorSubject } from 'rxjs';
import { ESPN_TEXT } from '../../../espn.const';
import { FantasyBaseballFreeAgentsFacade } from '../../facade/fantasy-baseball-free-agents.facade';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  xAxisSubject = new BehaviorSubject<any[]>(null);
  yAxisSubject = new BehaviorSubject<any[]>(null);

  constructor(
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballFreeAgentsFacade: FantasyBaseballFreeAgentsFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.fantasyBaseballLeagueFacade.getLeague(this.leagueId);
  }

  filterChange(event: { xAxis: string; yAxis: string }) {
    // this.fantasyBaseballFreeAgentsFacade.selectFreeAgentStatsObserv$
    //   .pipe(
    //     map(data => {
    //       const xData = data.map(res => res.stats[event.xAxis]).filter(res => res !== undefined);
    //       const yData = data.map(res => res.stats[event.yAxis]).filter(res => res !== undefined);
    //       this.xAxisSubject.next(xData);
    //       this.yAxisSubject.next(yData);
    //     })
    //   )
    //   .subscribe();
    // this.teamDynamicScatterChartData = this.fantasyBaseballTeamFacade.teamDynamicScatterChartData(event.xAxis ?? '', event.yAxis ?? '');
    // this.freeAgentDynamicScatterChartData = this.fantasyBaseballFreeAgentsFacade.freeAgentScatterChartData(
    //   event.xAxis ?? 0,
    //   event.yAxis ?? 0,
    //   this.scoringPeriodId
    // );
  }
}
