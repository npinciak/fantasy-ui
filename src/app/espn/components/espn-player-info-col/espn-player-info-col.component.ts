import { Component, EventEmitter, Output } from '@angular/core';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { FootballPlayer } from '@app/espn/nfl/models/football-player.model';

import {
  FA_ICON_BY_INJURY_STATUS,
  INJURY_LABEL_BY_INJURY_STATUS,
  INJURY_SEVERITY_BY_INJURY_STATUS,
  INJURY_SEVERITY_CLASS,
} from '@sports-ui/ui-sdk/espn';
import { EspnPlayerComponent } from '../espn-player/espn-player.component';

@Component({
  selector: 'app-espn-player-info-col',
  templateUrl: './espn-player-info-col.component.html',
})
export class EspnPlayerInfoColComponent extends EspnPlayerComponent<BaseballPlayer | FootballPlayer> {
  @Output() playerClicked = new EventEmitter<BaseballPlayer | FootballPlayer>();

  readonly FaIconByEspnPlayerInjuryStatus = FA_ICON_BY_INJURY_STATUS;
  readonly InjurySeverityByInjuryStatus = INJURY_SEVERITY_BY_INJURY_STATUS;
  readonly InjurySeverityClassByInjurySeverity = INJURY_SEVERITY_CLASS;
  readonly InjuryLabelByInjuryStatus = INJURY_LABEL_BY_INJURY_STATUS;

  onPlayerClick() {
    this.playerClicked.emit(this.player);
  }
}
