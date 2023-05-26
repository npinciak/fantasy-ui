import { Component, Input } from '@angular/core';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { EVENT_STATUS } from 'sports-ui-sdk';

@Component({
  selector: 'app-espn-fastcast-event-mlb',
  templateUrl: './espn-fastcast-event-mlb.component.html',
  styleUrls: ['./espn-fastcast-event-mlb.component.scss'],
})
export class EspnFastcastEventMlbComponent {
  @Input() event: FastcastEvent;

  get eventInProgress() {
    return !this.event.completed && this.event.status === EVENT_STATUS.InProgress;
  }
}
