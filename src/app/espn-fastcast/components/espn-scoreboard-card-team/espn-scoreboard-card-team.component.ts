import { Component, Input } from '@angular/core';
import { exists } from '@app/@shared/utilities/utilities.m';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { EspnFastcastClient, EVENT_STATUS } from 'sports-ui-sdk';
import { EventStatus } from 'sports-ui-sdk/lib/espn/models/espn-client.model';

@Component({
  selector: 'app-espn-scoreboard-card-team',
  templateUrl: './espn-scoreboard-card-team.component.html',
  styleUrls: ['./espn-scoreboard-card-team.component.scss'],
})
export class EspnScoreboardCardTeamComponent {
  @Input() team: FastcastEventTeam;
  @Input() isTournament: boolean;
  @Input() eventStatus: EventStatus;
  @Input() odds: EspnFastcastClient.EspnClientTeamOddsEntity;

  get ariaInfo() {
    return {
      teamName: `team-name-${this.team.uid}`,
    };
  }

  get opacity() {
    if (this.eventStatus === EVENT_STATUS.InProgress) return 'opacity-100';

    return !this.team.isWinner ? 'opacity-50' : null;
  }

  get isGameUndecided() {
    return this.team.isWinner == null;
  }

  get noTeamRank() {
    return !exists(this.team.rank);
  }

  get isPregame() {
    return this.eventStatus === EVENT_STATUS.Pre;
  }

  get inProgress() {
    return this.eventStatus === EVENT_STATUS.InProgress;
  }
}
