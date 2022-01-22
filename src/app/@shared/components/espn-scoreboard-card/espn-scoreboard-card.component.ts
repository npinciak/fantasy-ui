import { Component, Input } from '@angular/core';
import { FastcastEvent } from '@app/espn/models/fastcast-event.model';
import { FastCastGameStatus } from '@app/espn/service/espn.service';

@Component({
  selector: 'app-espn-scoreboard-card',
  templateUrl: './espn-scoreboard-card.component.html',
  styleUrls: ['./espn-scoreboard-card.component.scss'],
})
export class EspnScoreboardCardComponent {
  @Input() event: FastcastEvent;

  readonly FastCastGameStatus = FastCastGameStatus;
}
