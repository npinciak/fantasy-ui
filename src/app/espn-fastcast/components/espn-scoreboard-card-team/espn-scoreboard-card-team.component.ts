import { Component, Input } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { FastCastGameStatus } from '@espnClient/espn-client.model';

@Component({
  selector: 'app-espn-scoreboard-card-team',
  templateUrl: './espn-scoreboard-card-team.component.html',
  styleUrls: ['./espn-scoreboard-card-team.component.scss'],
})
export class EspnScoreboardCardTeamComponent {
  @Input() team: FastcastEventTeam;
  @Input() isTournament: boolean;
  @Input() eventStatus: FastCastGameStatus;

  get ariaInfo() {
    return {
      teamName: `team-name-${this.team.uid}`,
    };
  }

  get opacity() {
    if (this.eventStatus === FastCastGameStatus.InProgress) {
      return '100%';
    }

    return !this.team.isWinner ? '50%' : null;
  }

  get isGameUndecided() {
    return this.team.isWinner == null;
  }

  get noTeamRank() {
    return !exists(this.team.rank);
  }

  get isPregame() {
    return this.eventStatus === FastCastGameStatus.Pre;
  }
}
