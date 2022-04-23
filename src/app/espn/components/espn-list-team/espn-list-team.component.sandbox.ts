import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/@shared/shared.module';
import { MOCK_FASTCAST_EVENT_1 } from '@app/espn-fastcast/models/fastcast-event.model.mock';
import { HomeAwayTeam } from '@app/espn/models/espn-home-away.model';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { sandboxOf } from 'angular-playground';
import { EspnListTeamComponent } from './espn-list-team.component';

@Component({
  selector: `app-espn-list-team-sandbox`,
  templateUrl: './espn-list-team.component.sandbox.html',
  styleUrls: [],
})
class EspnListTeamSandboxComponent {
  readonly HomeAwayTeam = HomeAwayTeam;

  public events = [MOCK_FASTCAST_EVENT_1];

  constructor() {}
}
export default sandboxOf(EspnListTeamSandboxComponent, {
  label: 'Espn Fastcast Homepage',
  declarations: [EspnListTeamComponent],
  imports: [FlexLayoutModule, SharedModule, MaterialModule, NgxsModule.forRoot([]), BrowserAnimationsModule],
}).add('EspnListTeamComponent', {
  template: `<app-espn-list-team-sandbox></app-espn-list-team-sandbox>`,
});
