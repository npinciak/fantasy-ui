import { gameMap } from '@app/@shared/helpers/mapping';
import { Selector } from '@ngxs/store';
import { Game } from '../class/game.class';
import { EspnClientEvent } from '../interface';
import { EventMap, GameMap, MlbStateModel } from '../state/mlb-state.model';
import { MlbState } from '../state/mlb.state';

export class MlbGameSelectors {
  @Selector([MlbState.events])
  static eventToGameMap(event: EventMap): GameMap {
    return gameMap(event);
  }

  @Selector([MlbGameSelectors.eventToGameMap])
  static getSortedGamesByStartTime(games: GameMap): Game[] {
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
  static selectGameById(eventToGameMap: GameMap): (id: number) => Game {
    return (id: number) => eventToGameMap[id];
  }
}
