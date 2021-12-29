import { Component } from '@angular/core';

@Component({
  selector: `app-<%= lowercase(dasherize(componentName)) %>`,
  templateUrl: './<%= lowercase(dasherize(componentName)) %>.component.html',
  styleUrls: ['./<%= lowercase(dasherize(componentName)) %>.component.scss'],
})
export class <%= classify(componentName) %>Component {
  constructor() {}
}
