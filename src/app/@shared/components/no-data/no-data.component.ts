import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  template: `
    <div class="px-2 text-center">
      <div class="text-5xl font-bold">{{ title }}</div>
    </div>
  `,
})
export class NoDataComponent {
  @Input() title = 'No Data';
}
