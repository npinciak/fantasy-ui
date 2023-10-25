import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { EspnDateHelper } from '@app/espn/espn-date-helper';
import { fastcastEventSummary } from '@app/espn/espn-helpers';
import { FASTCAST_DATE_SHORT } from '@app/espn/espn.const';
import { EVENT_STATUS, SEASON_TYPE } from '@sports-ui/ui-sdk/espn-client';

@Component({
  selector: 'app-espn-scoreboard-card',
  templateUrl: './espn-scoreboard-card.component.html',
})
export class EspnScoreboardCardComponent {
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
    return this.event.seasonType === SEASON_TYPE.Postseason;
  }

  get eventSummary() {
    return fastcastEventSummary(this.event);
  }

  get tickerDate() {
    const tickerDate = new EspnDateHelper().tickerDate;
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
