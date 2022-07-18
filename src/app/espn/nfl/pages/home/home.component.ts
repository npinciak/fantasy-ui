import { Component, OnInit } from '@angular/core';
import { ESPN_TEXT } from '@app/espn/espn.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  constructor() {}

  ngOnInit(): void {}
}
