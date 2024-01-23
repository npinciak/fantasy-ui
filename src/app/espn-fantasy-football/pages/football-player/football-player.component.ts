import { Component, OnInit } from '@angular/core';
import { FantasyFootballPlayerCardFacade } from '@app/espn-fantasy-football/facade/fantasy-football-player-card.facade';
import { FantasyFootballPlayerNewsFacade } from '@app/espn-fantasy-football/facade/fantasy-football-player-news.facade';
import { PlayerRatingTimePeriod } from '@sports-ui/ui-sdk';

@Component({
  selector: 'app-football-player',
  templateUrl: './football-player.component.html',
})
export class FootballPlayerComponent implements OnInit {
  currentPlayerCard$ = this.fantasyFootballPlayerCardFacade.getCurrentPlayerCard$;
  playerCardStats$ = this.fantasyFootballPlayerCardFacade.getCurrentPlayerCardStats$;

  playerNews$ = this.fantasyFootballPlayeNewsFacade.getCurrentPlayerNews$;

  readonly PlayerRatingTimePeriod = PlayerRatingTimePeriod;

  constructor(
    private fantasyFootballPlayerCardFacade: FantasyFootballPlayerCardFacade,
    private fantasyFootballPlayeNewsFacade: FantasyFootballPlayerNewsFacade
  ) {}

  ngOnInit(): void {}
}
