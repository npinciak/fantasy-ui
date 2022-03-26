import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { STAT_PERIOD_FILTER_OPTIONS } from '../../consts/stats.const';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  teamLineup: BaseballPlayer[];

  public dataSource = new MatTableDataSource<any>();

  readonly STAT_PERIOD_FILTER_OPTIONS = STAT_PERIOD_FILTER_OPTIONS;
  readonly teamId = this.activatedRoute.snapshot.params.teamId;
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  stats$ = new BehaviorSubject<any[]>(null);
  scoringPeriodId = '102021';

  constructor(
    private store: Store,
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log(this.teamId)
    // await this.fantasyBaseballLeagueFacade.getLeague(this.leagueId);
    // if (this.teamId) {
    this.teamLineup = this.fantasyBaseballTeamFacade.getTeamStartingBatters(this.teamId);
    // }
    // this.store.selectSnapshot(FantasyBaseballTeamsSelector.selectTeamBatterStats)(this.teamId, '102021');
  }

  scoringPeriodIdChange(change: MatSelectChange): void {
    this.scoringPeriodId = change.value;

    const freeAgentStats = this.fantasyBaseballTeamFacade.selectTeamBatterStats(this.teamId, change.value);

    this.stats$.next(freeAgentStats);
  }

  filterChange(event: { xAxis: string; yAxis: string }): void {}
}
