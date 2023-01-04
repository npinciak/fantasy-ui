import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { Schedule } from '../models/schedule.model';
import { DailyFantasyNflTeamSlateAttributeSelectors } from '../nfl/selectors/daily-fantasy-nfl-team-slate-attr.selectors';
import { SlateTeam } from '../service/slate.service';
import { DailyFantasyMatchupState } from '../state/daily-fantasy-matchup.state';

export class DailyFantasyMatchupSelectors extends GenericSelector(DailyFantasyMatchupState) {
  @Selector([DailyFantasyMatchupSelectors.getList, DailyFantasyNflTeamSlateAttributeSelectors.getById])
  static getNflMatchupTableData(matchups: Schedule[], slateTeamById: (id: string | null) => SlateTeam | null) {
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
