import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { LeagueIdMap } from '@app/espn/espn-helpers';

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

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isEventToggled = changes.isEventToggled.currentValue;
  }

  readonly LeagueIdMap = LeagueIdMap;

  toggleExpansionPanel(eventId: string): void {
    this.toggleExpandedEvent.emit(eventId);
  }

  toggleOffExpansionPanel(eventId: string): void {
    this.toggleOffExpandedEvent.emit(eventId);
  }

  eventInProgress(event: FastcastEvent): boolean {
    return !event.completed && event.status !== 'pre' && event.status !== 'post';
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
