import { Component, Input } from '@angular/core';
import { FastcastEvent } from '@app/espn/models/fastcast-event.model';

@Component({
  selector: 'app-espn-fastcast-event-mlb',
  templateUrl: './espn-fastcast-event-mlb.component.html',
  styleUrls: ['./espn-fastcast-event-mlb.component.scss'],
})
export class EspnFastcastEventMlbComponent {
  @Input() event: FastcastEvent;

  get eventInProgress() {
    return !this.event.completed && this.event.status !== 'pre' && this.event.status !== 'post';
  }
}
