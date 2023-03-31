import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists } from '@app/@shared/utilities/utilities.m';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DfsSlatePlayersState } from '@app/dfs/state/dfs-players.state';

export class DailyFantasyMlbPlayerSelectors extends GenericSelector(DfsSlatePlayersState) {
  @Selector([DailyFantasyMlbPlayerSelectors.getList])
  static getPlayerTableData(list: SlatePlayer[]) {
    return list.map(p => {
      const salary = exists(p.salaries) ? Number(p.salaries[0].salary) : 0;

      const { id, name, rgTeamId, position } = p;

      return {
        id,
        name,
        rgTeamId,
        position,
        salary,
      };
    });
  }
}
