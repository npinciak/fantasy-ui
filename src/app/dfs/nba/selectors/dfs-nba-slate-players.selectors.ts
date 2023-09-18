import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DfsSlatePlayersState } from '@app/dfs/state/dfs-slate-players.state';
import { exists } from '@sports-ui/ui-sdk/helpers';

export class DfsNbaSlatePlayersSelectors extends GenericSelector(DfsSlatePlayersState) {
  @Selector([DfsNbaSlatePlayersSelectors.getList])
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
