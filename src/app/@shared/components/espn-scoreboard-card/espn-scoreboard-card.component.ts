import { Component, Input, OnInit } from '@angular/core';
import { FastCastGameStatus } from '@app/espn/espn.service';
import { FastcastEvent } from '@app/espn/models/fastcast-event.model';

@Component({
  selector: 'app-espn-scoreboard-card',
  templateUrl: './espn-scoreboard-card.component.html',
  styleUrls: ['./espn-scoreboard-card.component.scss'],
})
export class EspnScoreboardCardComponent implements OnInit {
  @Input() event: FastcastEvent;

  readonly FastCastGameStatus = FastCastGameStatus;

  constructor() {}

  ngOnInit(): void {}
}
