import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { uniqueBy } from '@app/@shared/helpers/unique-by';
import { exists, existsFilter } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DailyFantasyPlayersState } from '@app/dfs/state/daily-fantasy-players.state';
import { GridIronPlayer } from '../models/nfl-gridIron.model';
import { NflDfsPlayerTableData } from '../models/nfl-player.model';
import { DailyFantasyNflGridIronSelectors } from './daily-fantasy-nfl-grid-iron.selectors';

export class DailyFantasyNflPlayerSelectors extends GenericSelector(DailyFantasyPlayersState) {
  @Selector([DailyFantasyNflPlayerSelectors.getList])
  static getPlayerTeams(list: SlatePlayer[]) {
    const teams = existsFilter(list.map(p => p.teamId));
    return uniqueBy(teams, t => t).map(t => Number(t));
  }

  @Selector([DailyFantasyNflPlayerSelectors.getList])
  static getPlayerPositions(list: SlatePlayer[]) {
    const positions = existsFilter(list.map(p => p.position));
    return uniqueBy(positions, t => t);
  }

  @Selector([DailyFantasyNflPlayerSelectors.getList, DailyFantasyNflGridIronSelectors.getById])
  static getPlayerTableData(list: SlatePlayer[], gridIronById: (id: string | null) => GridIronPlayer | null): NflDfsPlayerTableData[] {
    return list
      .map(p => {
        const salary = exists(p.salaries) ? Number(p.salaries[0].salary) : 0;
        const gridIron = gridIronById(p.rgId);

        const { name, teamId, position } = p;

        return {
          name,
          teamId,
          position,
          salary,
          pown: exists(gridIron) ? gridIron.pown : null,
          opp: exists(gridIron) ? gridIron.opp : null,
          smash: exists(gridIron) ? gridIron.smash : null,
          ceil: exists(gridIron) ? gridIron.ceil : null,
          floor: exists(gridIron) ? gridIron.floor : null,
          tar: exists(gridIron) ? gridIron.tar : null,
          fpts: exists(gridIron) ? gridIron.fpts : null,
          fptsPerK: exists(gridIron) ? gridIron.fptsPerK : null,
          val: exists(gridIron) ? gridIron.value : null,
        };
      })
      .filter(p => p.opp != null);
  }
}
