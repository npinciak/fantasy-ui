import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/@shared/shared.module';
import { EspnListTeamComponent } from '@app/espn/components/espn-list-team/espn-list-team.component';
import { EspnFastcastFacade } from '@app/espn/facade/espn-fastcast.facade';
import { EspnFastcastFacadeMock } from '@app/espn/facade/espn-fastcast.facade.mock';
import { HomeAwayTeam } from '@app/espn/models/espn-home-away.model';
import { MOCK_FASTCAST_EVENT_1 } from '@app/espn/models/fastcast-event.model.mock';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { sandboxOf } from 'angular-playground';
import { EspnHomeComponent } from './espn-home.component';

@Component({
  selector: `app-espn-home-sandbox`,
  templateUrl: './espn-home.component.sandbox.html',
  styleUrls: [],
})
class EspnHomeSandboxComponent {
  readonly HomeAwayTeam = HomeAwayTeam;

  constructor(readonly fastcastFacade: EspnFastcastFacade) {}
}
export default sandboxOf(EspnHomeSandboxComponent, {
  label: 'Espn Fastcast Homepage',
  declarations: [EspnHomeComponent, EspnListTeamComponent],
  imports: [FlexLayoutModule, SharedModule, MaterialModule, NgxsModule.forRoot([]), BrowserAnimationsModule],
  providers: [{ provide: EspnFastcastFacade, useClass: EspnFastcastFacadeMock }],
}).add('EspnHomeComponent', {
  template: `<app-espn-home-sandbox></app-espn-home-sandbox>`,
});
