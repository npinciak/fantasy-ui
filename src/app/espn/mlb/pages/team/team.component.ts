import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EspnTableFacade } from '@app/espn/facade/espn-table.facade';
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

  readonly teamId = this.activatedRoute.snapshot.params.teamId.toString();

  constructor(
    readonly espnTableFacade: EspnTableFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.teamLineup = this.fantasyBaseballTeamFacade.getTeamStartingBatters(this.teamId);
  }
}
