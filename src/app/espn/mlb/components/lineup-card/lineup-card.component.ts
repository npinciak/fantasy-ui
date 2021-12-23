import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lineup-card',
  templateUrl: './lineup-card.component.html',
  styleUrls: ['./lineup-card.component.scss'],
})
export class LineupCardComponent implements OnInit {
  @Input() lineup: any[];
  constructor() {}

  ngOnInit(): void {}
}
