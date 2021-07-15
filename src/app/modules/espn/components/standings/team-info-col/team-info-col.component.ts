import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-info-col',
  templateUrl: './team-info-col.component.html',
})
export class TeamInfoColComponent {
  @Input() team: any;
  @Input() isLeader: boolean;
  constructor() {}
}
