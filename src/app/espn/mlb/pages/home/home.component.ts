import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { ESPN_TEXT } from '../../../espn.const';
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

  teamDynamicScatterChartData: any;

  constructor(
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fantasyBaseballLeagueFacade.getLeague(this.leagueId);
  }

  filterChange(event: { xAxis: string; yAxis: string }) {
    this.fantasyBaseballTeamFacade.selectTeamBatterStats('5');

    this.teamDynamicScatterChartData = this.fantasyBaseballTeamFacade.teamDynamicScatterChartData(event.xAxis ?? '', event.yAxis ?? '');
  }
}
