import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { LeagueIdMap } from '@app/espn/espn-helpers';
import { FastCastGameStatus } from '@client/espn-client.model';

@Component({
  selector: 'app-espn-scoreboard-card',
  templateUrl: './espn-scoreboard-card.component.html',
  styleUrls: ['./espn-scoreboard-card.component.scss'],
})
export class EspnScoreboardCardComponent implements OnChanges {
  @Input() event: FastcastEvent;
  @Input() isTournament: boolean;
  @Input() isEventToggled: boolean;
  @Input() ariaSetsize: number;
  @Input() ariaPosinset: number;
  @Input() index: number = 0;

  @Output() toggleExpandedEvent = new EventEmitter<string>();
  @Output() toggleOffExpandedEvent = new EventEmitter<string>();
  @Output() cardClick = new EventEmitter<FastcastEvent>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isEventToggled = changes.isEventToggled.currentValue;
  }

  readonly league = LeagueIdMap;

  toggleExpansionPanel(eventId: string): void {
    this.toggleExpandedEvent.emit(eventId);
  }

  toggleOffExpansionPanel(eventId: string): void {
    this.toggleOffExpandedEvent.emit(eventId);
  }

  get eventInProgress(): boolean {
    return this.event.status === FastCastGameStatus.InProgress;
  }

  onCardClick(event: FastcastEvent) {
    this.cardClick.emit(event);
  }

  get ariaInfo() {
    return {
      eventName: `event-name-${this.index}`,
      eventLocation: `event-location-${this.index}`,
      eventSummary: `event-summary-${this.index}`,
      eventLastPlay: `event-last-play-${this.index}`,
      eventDescription: `event-location-${this.index} event-summary-${this.index} event-last-play${this.index}`,
    };
  }
}
