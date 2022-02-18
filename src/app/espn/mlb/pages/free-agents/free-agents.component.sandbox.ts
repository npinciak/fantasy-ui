import { Component } from '@angular/core';
import { sandboxOf } from 'angular-playground';

import { FreeAgentsComponent } from './free-agents.component';

@Component({
  selector: `app-free-agents-sandbox`,
  templateUrl: './free-agents.component.sandbox.html',
  styleUrls: [],
})
class FreeAgentsSandboxComponent {
  constructor(){}
}

export default sandboxOf(FreeAgentsSandboxComponent, {
  declarations: [
    FreeAgentsComponent,
  ],
  imports:[],
}).add('FreeAgentsSandboxComponent', {
  template: `<app-free-agents-sandbox></app-free-agents-sandbox>`,
});
