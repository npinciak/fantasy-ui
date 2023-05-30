import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { tickerDate } from '@app/@shared/helpers/date';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { fastcastEventSummary } from '@app/espn/espn-helpers';
import { FASTCAST_DATE_SHORT } from '@app/espn/espn.const';
import { EVENT_STATUS, SEASON_ID } from 'sports-ui-sdk';

@Component({
  selector: 'app-espn-scoreboard-card',
  templateUrl: './espn-scoreboard-card.component.html',
})
export class EspnScoreboardCardComponent implements OnChanges {
  @Input() event: FastcastEvent;
  @Input() isTournament: boolean;
  @Input() isEventToggled: boolean;
  @Input() ariaSetsize: number;
  @Input() ariaPosinset: number;
  @Input() index = 0;

  @Output() toggleExpandedEvent = new EventEmitter<string>();
  @Output() toggleOffExpandedEvent = new EventEmitter<string>();

  readonly FASTCAST_DATE_SHORT = FASTCAST_DATE_SHORT;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isEventToggled = changes.isEventToggled.currentValue;
  }

  toggleExpansionPanel(eventId: string): void {
    this.toggleExpandedEvent.emit(eventId);
  }

  toggleOffExpansionPanel(eventId: string): void {
    this.toggleOffExpandedEvent.emit(eventId);
  }

  get eventInProgress(): boolean {
    return this.event.status === EVENT_STATUS.InProgress;
  }

  get isPostseason() {
    return this.event.seasonType === SEASON_ID.Postseason;
  }

  get eventSummary() {
    return fastcastEventSummary(this.event);
  }

  get tickerDate() {
    return tickerDate(this.event.timestamp);
  }

  get ariaInfo() {
    return {
      eventName: `event-name-${this.index}`,
      eventLocation: `event-location-${this.index}`,
      eventSummary: `event-summary-${this.index}`,
      eventLastPlay: `event-last-play-${this.index}`,
      eventDescription: `event-location-${this.index} event-summary-${this.index} event-last-play-${this.index}`,
      eventGamecast: `View ${this.event.teams?.away.name} @ ${this.event.teams?.home.name} gamecast`,
    };
  }
}
