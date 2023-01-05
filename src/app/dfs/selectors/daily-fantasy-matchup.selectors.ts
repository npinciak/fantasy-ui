import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { Schedule } from '../models/schedule.model';
import { SlateTeamNfl } from '../nfl/models/nfl-slate-attr.model';
import { DfsNflSlateTeamDetailsSelectors } from '../nfl/selectors/dfs-nfl-slate-team.selectors';
import { DfsMatchupsState } from '../state/dfs-matchups.state';

export class DailyFantasyMatchupSelectors extends GenericSelector(DfsMatchupsState) {
  @Selector([DailyFantasyMatchupSelectors.getList, DfsNflSlateTeamDetailsSelectors.getById])
  static getNflMatchupTableData(matchups: Schedule[], slateTeamById: (id: string | null) => SlateTeamNfl | null) {
    return matchups.map(m => {
      const homeTeam = slateTeamById(m.homeTeam.rgId);
      const awayTeam = slateTeamById(m.awayTeam.rgId);
      return {
        home: {
          name: m.homeTeam.name,
          ...homeTeam?.outsiders,
          ...homeTeam?.vegas,
        },
        away: {
          name: m.awayTeam.name,
          ...awayTeam?.outsiders,
          ...awayTeam?.vegas,
        },
      };
    });
  }
}
