import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  template: `
    <div class="px-2 text-center">
      <div class="text-2xl text-slate-400">{{ title }}</div>
    </div>
  `,
})
export class NoDataComponent {
  @Input() title = 'No Data';
}
