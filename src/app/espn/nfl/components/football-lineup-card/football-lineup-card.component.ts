import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import {
  InjurySeverityByInjuryStatus,
  InjurySeverityColor,
  InjurySeverityColorByInjurySeverity,
  MatIconByEspnPlayerInjuryStatus,
  PlayerStatusAbbrevByInjuryStatusType,
} from '@app/espn/models/injury.model';
import { EspnPlayerInjuryStatus } from '@espnClient/espn-client.model';
import { FootballPlayer } from '../../models/football-player.model';

@Component({
  selector: 'app-football-lineup-card',
  templateUrl: './football-lineup-card.component.html',
  styleUrls: ['./football-lineup-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FootballLineupCardComponent {
  @Input() title: string = 'Lineup';
  @Input() lineup: FootballPlayer[];
  @Input() points = 0;
  @Input() projectedPoints: number;
  @Input() week: number;

  @Input() isLoading = false;

  @Output() playerClicked = new EventEmitter<FootballPlayer | null>();
  @Output() refreshClicked = new EventEmitter();

  readonly MatIconByEspnPlayerInjuryStatus = MatIconByEspnPlayerInjuryStatus;
  readonly InjurySeverityByInjuryStatus = InjurySeverityByInjuryStatus;
  readonly InjurySeverityColorByInjurySeverity = InjurySeverityColorByInjurySeverity;
  readonly PlayerStatusAbbrevByInjuryStatusType = PlayerStatusAbbrevByInjuryStatusType;

  playerLabel(player: FootballPlayer) {
    return `${player.name}, ${player.team}, ${player.lineupSlot}`;
  }

  playerInjuryStatusColor(injuryStatus: EspnPlayerInjuryStatus): InjurySeverityColor {
    return InjurySeverityColorByInjurySeverity[InjurySeverityByInjuryStatus[injuryStatus]];
  }

  onPlayerClick(player) {
    this.playerClicked.emit(player);
  }

  onRefreshClick() {
    this.refreshClicked.emit();
  }
}
