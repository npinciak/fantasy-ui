import { Component, Input } from '@angular/core';
import { LeagueIdMap } from '@app/espn/espn-helpers';
import { FastcastEvent } from '@app/espn/models/fastcast-event.model';

@Component({
  selector: 'app-espn-scoreboard-card',
  templateUrl: './espn-scoreboard-card.component.html',
  styleUrls: ['./espn-scoreboard-card.component.scss'],
})
export class EspnScoreboardCardComponent {
  @Input() event: FastcastEvent;
  @Input() isTournament: boolean;

  readonly LeagueIdMap = LeagueIdMap;
}
