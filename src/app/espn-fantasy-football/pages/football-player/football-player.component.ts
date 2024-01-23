import { Component, OnInit } from '@angular/core';
import { FantasyFootballPlayerCardFacade } from '@app/espn-fantasy-football/facade/fantasy-football-player-card.facade';

@Component({
  selector: 'app-football-player',
  templateUrl: './football-player.component.html',
})
export class FootballPlayerComponent implements OnInit {
  currentPlayerCard$ = this.fantasyFootballPlayerCardFacade.getCurrentPlayerCard$;
  currentPlayerCardStats$ = this.fantasyFootballPlayerCardFacade.getCurrentPlayerCardStats$;

  constructor(private fantasyFootballPlayerCardFacade: FantasyFootballPlayerCardFacade) {}

  ngOnInit(): void {}
}
