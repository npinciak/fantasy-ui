import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { tickerDate } from '@app/@shared/helpers/date';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { FASTCAST_DATE_SHORT } from '@app/espn/espn.const';
import { EspnClient } from 'sports-ui-sdk';

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

  readonly FASTCAST_DATE_SHORT = FASTCAST_DATE_SHORT;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isEventToggled = changes.isEventToggled.currentValue;
  }

  readonly league = EspnClient.LeagueId;

  toggleExpansionPanel(eventId: string): void {
    this.toggleExpandedEvent.emit(eventId);
  }

  toggleOffExpansionPanel(eventId: string): void {
    this.toggleOffExpandedEvent.emit(eventId);
  }

  get eventPostponed(): boolean {
    return this.event.status === EspnClient.FastCastGameStatus.Post;
  }

  get eventInProgress(): boolean {
    return this.event.status === EspnClient.FastCastGameStatus.InProgress;
  }

  get isPostseason() {
    return this.event.seasonType === EspnClient.FastCastSeasonType.Post;
  }

  get eventSummary() {
    if (this.eventInProgress) {
      return this.event.summary;
    }

    if (this.eventPostponed) {
      return this.event.summary;
    }

    if (!this.event.completed && this.isPostseason) {
      return `${this.event.note ? this.event.note : this.event.name} | ${this.tickerDate}`;
    }

    if (this.event.completed && this.isPostseason) {
      return `${this.event.note ?? this.event.summary}`;
    }

    if (this.event.completed && !this.isPostseason) {
      return `${this.event.summary}`;
    }

    return this.tickerDate;
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
