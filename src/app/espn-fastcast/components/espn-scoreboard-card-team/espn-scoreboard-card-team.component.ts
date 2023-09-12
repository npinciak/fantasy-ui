import { Component, Input } from '@angular/core';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { EspnFastcastClient } from '@sports-ui/ui-sdk/espn';
import { EVENT_STATUS, EventStatus } from '@sports-ui/ui-sdk/espn-client';
import { exists } from '@sports-ui/ui-sdk/helpers';

@Component({
  selector: 'app-espn-scoreboard-card-team',
  templateUrl: './espn-scoreboard-card-team.component.html',
})
export class EspnScoreboardCardTeamComponent {
  @Input() team: FastcastEventTeam;
  @Input() isTournament = false;
  @Input() eventStatus: EventStatus;
  @Input() odds: EspnFastcastClient.EspnClientTeamOddsEntity;
  @Input() isPostseason = false;

  get ariaInfo() {
    return {
      teamName: `team-name-${this.team.uid}`,
    };
  }

  get opacity() {
    if (this.eventStatus === EVENT_STATUS.InProgress) return 'opacity-100';
    if (this.isGameUndecided) return 'opacity-100';
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

  get teamRecord() {
    if (!this.isTournament && !this.isPostseason) return this.team.record;
    if (this.isPostseason && this.team.eventIds?.leagueId === '90') return this.team.record;
    if (this.isPostseason) return this.team.seriesRecord;
    if (this.isTournament) return `Aggregate: ${this.team?.aggregateScore} `;
  }
}
