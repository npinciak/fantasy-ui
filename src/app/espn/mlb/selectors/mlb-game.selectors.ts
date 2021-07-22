import { Selector } from '@ngxs/store';
import { BaseballGame } from '../class/game.class';
import { espnEventToBaseballGamesMap } from '../helpers';
import { EspnClientEvent } from '../interface';
import { BaseballGameMap, EventMap, GameMap, MlbStateModel } from '../state/mlb-state.model';
import { MlbState } from '../state/mlb.state';

export class MlbGameSelectors {
  @Selector([MlbState.events])
  static eventToGameMap(event: EventMap): BaseballGameMap {
    return espnEventToBaseballGamesMap(event);
  }

  @Selector([MlbGameSelectors.eventToGameMap])
  static getSortedGamesByStartTime(games: BaseballGameMap): BaseballGame[] {
    return Object.values(games).sort((a, b) => a.gameDate.milli - b.gameDate.milli);
  }

  @Selector([MlbGameSelectors.getNumberOfGames])
  static noGames(numberOfGames: number): boolean {
    return numberOfGames === 0;
  }

  @Selector([MlbState.events])
  static getNumberOfGames(events: EventMap): number {
    return Object.keys(events).length;
  }

  @Selector([MlbGameSelectors.eventToGameMap])
  static selectGameById(eventToGameMap: BaseballGameMap): (id: number) => BaseballGame {
    return (id: number) => eventToGameMap[id];
  }
}
