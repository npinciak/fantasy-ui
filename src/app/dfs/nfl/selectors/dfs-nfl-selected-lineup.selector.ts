import { SlatePlayer } from '@app/dfs/models/player.model';
import { DfsSelectedLineupSelector } from '@app/dfs/selectors/dfs-selected-lineup.selector';
import { Selector } from '@ngxs/store';
import { existsFilter } from '@sports-ui/ui-sdk/helpers';
import { DfsNflPlayerSelectors } from './dfs-nfl-players.selectors';

export class DfsNflSelectedLineupSelector extends DfsSelectedLineupSelector {
  @Selector([DfsSelectedLineupSelector.getSelectedIds, DfsNflPlayerSelectors.getById])
  static getSelectedPlayers(selectedIds: string[], playerById: (id: string | null) => SlatePlayer | null): SlatePlayer[] {
    return existsFilter(selectedIds.map(id => playerById(id)));
  }
}
