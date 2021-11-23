import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  get teamId(): number {
    return +this.activatedRoute.snapshot.params.teamId;
  }
}
