import { Component, OnInit } from '@angular/core';
import { EspnFastcastConnectionFacade } from '@app/espn-fastcast/facade/espn-fastcast-connection.facade';

@Component({
  selector: 'app-espn-home',
  templateUrl: './espn-home.component.html',
})
export class EspnHomeComponent implements OnInit {
  constructor(private fastcastFacade: EspnFastcastConnectionFacade) {}

  ngOnInit(): void {
    this.fastcastFacade.fetchStaticFastcast({
      sport: null,
      league: null,
      weeks: null,
      seasontype: null,
    });
  }
}
