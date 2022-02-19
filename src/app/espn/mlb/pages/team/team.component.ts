import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
import { Store } from '@ngxs/store';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { BaseballPlayer } from '../../models/baseball-player.model';
import { FantasyBaseballTeamsSelector } from '../../selectors/fantasy-baseball-teams.selector';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  teamLineup: BaseballPlayer[];

  public dataSource = new MatTableDataSource<any>();

  readonly teamId = this.activatedRoute.snapshot.params.teamId.toString();

  constructor(
    private store: Store,
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teamLineup = this.fantasyBaseballTeamFacade.getTeamStartingBatters(this.teamId);
    this.store.selectSnapshot(FantasyBaseballTeamsSelector.selectTeamBatterStats)(this.teamId, '102021');
  }
}
