import { Component, OnInit } from '@angular/core';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';

@Component({
  selector: 'app-espn-scoreboard',
  templateUrl: './espn-scoreboard.component.html',
  styleUrls: ['./espn-scoreboard.component.scss'],
})
export class EspnScoreboardComponent implements OnInit {
  constructor(readonly fastcastFacade: EspnFastcastFacade) {}

  ngOnInit(): void {}
}
