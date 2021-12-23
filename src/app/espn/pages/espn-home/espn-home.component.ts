import { Component, OnInit } from '@angular/core';
import { FastCastGameStatus } from '@app/espn/espn.service';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';
import { HomeAwayTeam } from '@app/espn/models/espn-home-away.model';

@Component({
  selector: 'app-espn-home',
  templateUrl: './espn-home.component.html',
  styleUrls: ['./espn-home.component.scss'],
})
export class EspnHomeComponent implements OnInit {
  readonly HomeAwayTeam = HomeAwayTeam;
  readonly FastCastGameStatus = FastCastGameStatus;

  constructor(readonly fastcastFacade: EspnFastcastFacade) {}

  ngOnInit(): void {}
}
