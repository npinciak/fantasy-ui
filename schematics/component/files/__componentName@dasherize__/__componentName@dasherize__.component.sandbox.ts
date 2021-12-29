import { Component } from '@angular/core';
import { sandboxOf } from 'angular-playground';

import { <%= classify(componentName) %>Component } from './<%= lowercase(dasherize(componentName)) %>.component';

@Component({
  selector: `app-<%= lowercase(dasherize(componentName)) %>-sandbox`,
  templateUrl: './<%= lowercase(dasherize(componentName)) %>.component.sandbox.html',
  styleUrls: [],
})
class <%= classify(componentName) %>SandboxComponent {
  constructor(){}
}

export default sandboxOf(<%= classify(componentName) %>SandboxComponent, {
  declarations: [
    <%= classify(componentName) %>Component,
  ],
  imports:[],
}).add('<%= classify(componentName) %>SandboxComponent', {
  template: `<app-<%= lowercase(dasherize(componentName)) %>-sandbox></app-<%= lowercase(dasherize(componentName)) %>-sandbox>`,
});
