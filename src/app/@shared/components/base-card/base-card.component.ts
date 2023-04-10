import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-card',
  templateUrl: './base-card.component.html',
})
export class BaseCardComponent implements OnInit {
  @Input() title = 'Title';
  @Input() subtitle = 'Subtitle';
  @Input() titleColor = 'text-orange-400';
  @Input() subTitleColor = 'text-orange-700';
  @Input() height = null;

  constructor() {}

  ngOnInit(): void {}
}
