import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GRID_TEMPLATE } from 'src/app/@shared/helpers/grid';
import { rosterMap } from 'src/app/@shared/helpers/mapping';
import { BaseballTeam } from '../../class/team.class';
import { MlbTeamFacade } from '../../facade/mlb-team.facade';
import { MlbFacade } from '../../facade/mlb.facade';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  readonly gridTemplate = GRID_TEMPLATE;

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
