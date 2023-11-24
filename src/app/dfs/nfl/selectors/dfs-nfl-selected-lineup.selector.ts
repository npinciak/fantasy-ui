import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DfsRulset } from '@app/dfs/ruleset/ruleset';
import { DfsSelectedLineupSelector } from '@app/dfs/selectors/dfs-selected-lineup.selector';
import { SITE } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { existsFilter } from '@sports-ui/ui-sdk/helpers';
import { DfsNflPlayerSelectors } from './dfs-nfl-players.selectors';

type SelectedPlayerPositionLimits = {
  QB?: number;
  RB?: number;
  WR?: number;
  TE?: number;
  FLEX?: number;
  DST?: number;
};

export class DfsNflSelectedLineupSelector extends DfsSelectedLineupSelector {
  @Selector([DfsNflSelectedLineupSelector.getSelectedIds, DfsNflPlayerSelectors.getById])
  static getSelectedPlayers(selectedIds: string[], playerById: (id: string | null) => SlatePlayer | null): SlatePlayer[] {
    return existsFilter(selectedIds.map(id => playerById(id)));
  }

  @Selector([DfsNflSelectedLineupSelector.getSelectedPlayers])
  static getSelectedPlayersTotalSalary(selectedPlayers: SlatePlayer[]): number {
    return selectedPlayers.reduce((acc, player) => {
      return acc + player.salaries![0].salary;
    }, 0);
  }

  @Selector([DfsNflSelectedLineupSelector.getSelectedPlayersTotalSalary])
  static getSelectedPlayersTotalSalaryRemaining(totalSalary: number): number {
    return new DfsRulset(SITE.Draftkings, 'NFL').salaryCap - totalSalary;
  }

  @Selector([DfsNflSelectedLineupSelector.getSelectedPlayers])
  static getSelectedPlayersPositionLimits(selectedPlayers: SlatePlayer[]) {
    return selectedPlayers
      .map(player => player.position)
      .reduce((acc, position) => {
        return {
          ...acc,
          [position]: acc[position] ? acc[position] + 1 : 1,
        };
      }, {} as SelectedPlayerPositionLimits);
  }
}
