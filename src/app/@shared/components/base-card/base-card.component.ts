import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-card',
  templateUrl: './base-card.component.html',
})
export class BaseCardComponent {
  @Input() title = null;
  @Input() subtitle = null;
  @Input() titleColor = 'text-orange-400';
  @Input() subTitleColor = 'text-orange-700';
  @Input() height = null;
}
