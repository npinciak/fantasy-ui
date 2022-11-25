import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamEntity } from '@app/@shared/base-models/base-team.model';

@Component({
  selector: 'app-espn-team-info-col',
  templateUrl: './espn-team-info-col.component.html',
})
export class EspnTeamInfoColComponent<T extends TeamEntity> {
  @Input() team: T;
  @Input() isLeader: boolean;

  @Output() navigateToTeamClicked = new EventEmitter<string>();

  constructor() {}

  get teamTableLabel() {
    return `team-${this.team?.id}`;
  }

  navigateToTeam() {
    this.navigateToTeamClicked.emit(this.team?.id);
  }
}
