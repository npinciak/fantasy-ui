import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit {
  @Input() playerNews: unknown;

  constructor() {}

  ngOnInit(): void {}
}
