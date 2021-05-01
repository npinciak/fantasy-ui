import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BaseballPlayer } from '../../models/mlb/class/player.class';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { EspnFacade } from '../../store/espn.facade';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  dataSource = new MatTableDataSource<BaseballTeam>();

  constructor(readonly espnFacade: EspnFacade, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { }

  get batters() {
    return this._roster.filter(player => !player.isPitcher);
  }

  get pitchers() {
    return this._roster.filter(player => player.isPitcher);
  }

  private get _roster() {
    const arr: BaseballPlayer[] = [];
    this._team.roster.forEach(player => {
      arr.push(new BaseballPlayer(player));
    });
    return arr;
  }

  get teamName() {
    return this._team.teamName;
  }

  private get _team() {
    return this.espnFacade.teamsSnapshot.find(team => team.teamId === this.teamId);
  }

  private get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  private get sport() {
    return this.activatedRoute.snapshot.params.sport;
  }

  private get teamId(): number {
    return Number(this.activatedRoute.snapshot.params.teamId);
  }

}
