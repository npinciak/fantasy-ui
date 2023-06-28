import { Component, OnInit } from '@angular/core';
import { FantasyBaseballPlayerCardFacade } from '../../facade/fantasy-baseball-player-card.facade';
import { FantasyBaseballPlayerNewsFacade } from '../../facade/fantasy-baseball-player-news.facade';

@Component({
  selector: 'app-baseball-player',
  templateUrl: './baseball-player.component.html',
})
export class BaseballPlayerComponent implements OnInit {
  playerNews$ = this.fantasyBaseballPlayerNewsFacade.currentPlayerNews$;
  currentPlayerCard$ = this.fantasyBaseballPlayerCardFacade.getCurrentPlayerCard$;

  constructor(
    private fantasyBaseballPlayerNewsFacade: FantasyBaseballPlayerNewsFacade,
    private fantasyBaseballPlayerCardFacade: FantasyBaseballPlayerCardFacade
  ) {}

  ngOnInit(): void {}
}
