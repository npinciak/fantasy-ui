import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BaseballTeam } from '../../class';
import { MlbTeamFacade } from '../../facade/mlb-team.facade';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  public dataSource = new MatTableDataSource<BaseballTeam>();

  constructor(readonly mlbTeamFacade: MlbTeamFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  get teamId(): number {
    return +this.activatedRoute.snapshot.params.teamId;
  }
}
