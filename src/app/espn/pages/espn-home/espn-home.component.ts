import { Component, OnInit } from '@angular/core';
import { EspnFastcastEventFacade } from '@app/espn/facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '@app/espn/facade/espn-fastcast-league.facade';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';
import { HomeAwayTeam } from '@app/espn/models/espn-home-away.model';
import { FastCastGameStatus } from '@app/espn/service/espn.service';

@Component({
  selector: 'app-espn-home',
  templateUrl: './espn-home.component.html',
  styleUrls: ['./espn-home.component.scss'],
})
export class EspnHomeComponent implements OnInit {
  readonly HomeAwayTeam = HomeAwayTeam;
  readonly FastCastGameStatus = FastCastGameStatus;

  constructor(
    readonly fastcastFacade: EspnFastcastFacade,
    readonly fastcastLeagueFacade: EspnFastcastLeagueFacade,
    readonly fastcastEventFacade: EspnFastcastEventFacade
  ) {}

  ngOnInit(): void {}
}
