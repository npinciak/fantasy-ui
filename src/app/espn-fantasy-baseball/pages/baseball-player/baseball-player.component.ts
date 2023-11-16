import { Component, OnInit } from '@angular/core';
import { BaseballStat } from '@sports-ui/ui-sdk/espn';
import { PlayerRatingTimePeriod } from '@sports-ui/ui-sdk/espn-client';
import { of } from 'rxjs';
import { PLAYER_BATTER_STATS_HEADERS, PLAYER_BATTER_STATS_ROWS } from '../../consts/fantasy-baseball-table.const';
import { FantasyBaseballPlayerCardFacade } from '../../facade/fantasy-baseball-player-card.facade';
import { FantasyBaseballPlayerNewsFacade } from '../../facade/fantasy-baseball-player-news.facade';

@Component({
  selector: 'app-baseball-player',
  templateUrl: './baseball-player.component.html',
})
export class BaseballPlayerComponent implements OnInit {
  readonly PlayerRatingTimePeriod = PlayerRatingTimePeriod;
  readonly BaseballStat = BaseballStat;
  readonly BATTER_STATS_ROWS = PLAYER_BATTER_STATS_ROWS;
  readonly BATTER_STATS_HEADERS = PLAYER_BATTER_STATS_HEADERS;

  playerNews$ = this.fantasyBaseballPlayerNewsFacade.currentPlayerNews$;
  currentPlayerCard$ = this.fantasyBaseballPlayerCardFacade.getCurrentPlayerCard$;
  playerCardStats$ = this.fantasyBaseballPlayerCardFacade.getCurrentPlayerCardStats$;

  tableConfig$ = of({
    rows: PLAYER_BATTER_STATS_ROWS,
    headers: PLAYER_BATTER_STATS_HEADERS,
  });

  constructor(
    private fantasyBaseballPlayerNewsFacade: FantasyBaseballPlayerNewsFacade,
    private fantasyBaseballPlayerCardFacade: FantasyBaseballPlayerCardFacade
  ) {}

  ngOnInit(): void {}
}
