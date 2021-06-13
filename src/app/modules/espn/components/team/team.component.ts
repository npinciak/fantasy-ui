import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { gridTemplate } from 'src/app/@shared/helpers/grid';
import { rosterMap } from 'src/app/@shared/helpers/mapping';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { MlbFacade } from '../../store/mlb/mlb.facade';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  readonly gridTemplate = gridTemplate;

  public dataSource = new MatTableDataSource<BaseballTeam>();


  constructor(readonly store: Store, readonly mlbFacade: MlbFacade, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.mlbFacade.teamsEmpty) {
      this.mlbFacade.getLeague(this.leagueId);
    }

  }

  get teamName() {
    return this._team.teamName;
  }

  get batterLineup() {
    return this._batters.sort((a, b) => a.lineupSlot.displayOrder - b.lineupSlot.displayOrder)
      .filter(player => !player.lineupSlot.bench);
  }

  get batterBench() {
    return this._batters.sort((a, b) => a.lineupSlot.displayOrder - b.lineupSlot.displayOrder)
      .filter(player => player.lineupSlot.bench);
  }

  get pitcherLineup() {
    return this._pitchers.sort((a, b) => a.lineupSlot.displayOrder - b.lineupSlot.displayOrder)
      .filter(player => !player.lineupSlot.bench);
  }

  private get _batters() {
    return this._rosterArr.filter(player => !player.isPitcher && !player.isInjured);
  }

  private get _pitchers() {
    return this._rosterArr.filter(player => player.isPitcher && !player.isInjured);
  }

  private get _rosterArr() {
    return [...this._roster.values()];
  }

  private get _roster() {
    return rosterMap(this._team.roster);
  }

  // private get _games() {
  //   return this.mlbFacade.competitionSnapshot;
  // }

  private get _team() {
    return this.mlbFacade.teamsSnapshot.get(this.teamId);
  }

  private get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  private get teamId(): number {
    return +this.activatedRoute.snapshot.params.teamId;
  }

}
