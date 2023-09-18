import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';
import { Vegas } from '../models/vegas.model';
import { Outsiders, SlateTeamNfl } from '../nfl/models/nfl-slate-attr.model';
import { DfsNflSlateTeamDetailsSelectors } from '../nfl/selectors/dfs-nfl-slate-team.selectors';
import { DfsMatchupsState } from '../state/dfs-matchups.state';

export class DailyFantasyMatchupSelectors extends GenericSelector(DfsMatchupsState) {
  @Selector([DailyFantasyMatchupSelectors.getList, DfsNflSlateTeamDetailsSelectors.getById])
  static getNflMatchupTableData(matchups: Schedule[], slateTeamById: (id: string | null) => SlateTeamNfl | null) {
    return matchups.map(m => {
      const homeTeam = slateTeamById(m.homeTeam.rgId);
      const awayTeam = slateTeamById(m.awayTeam.rgId);

      const { movement, overUnder } = homeTeam?.vegas ?? awayTeam?.vegas ?? { line: null, movement: null, overUnder: null };

      return {
        movement,
        overUnder,
        home: {
          ...homeTeam?.outsiders,
          name: m.homeTeam.name,
          oppTotal: homeTeam?.vegas?.oppTotal ?? null,
          total: homeTeam?.vegas?.total ?? null,
          line: homeTeam?.vegas?.line ?? null,
        },
        away: {
          ...awayTeam?.outsiders,
          name: m.awayTeam.name,
          oppTotal: awayTeam?.vegas?.oppTotal,
          total: awayTeam?.vegas?.total,
          line: awayTeam?.vegas?.line,
        },
      };
    });
  }
}

function transformMatchupTeamToTeamTableRow(slateTeam: SlateTeamNfl | null, team: Team) {
  const { movement, overUnder } = slateTeam?.vegas ?? { line: null, movement: null, overUnder: null };

  const { name } = team;

  if (!slateTeam) return null;
  if (!slateTeam.vegas) return null;

  const { total, line } = slateTeam.vegas;

  return {
    name,
    ...slateTeam?.outsiders,
    oppTotal: slateTeam?.vegas?.oppTotal ?? null,
    total: slateTeam?.vegas?.total ?? null,
    line: slateTeam?.vegas?.line ?? null,
  };
}

type NflMatchupTableRow = Pick<Vegas, 'movement' | 'overUnder'> & {
  home: NflMatchupTableRowTeam;
  away: NflMatchupTableRowTeam;
};

type NflMatchupTableRowTeam = Pick<Vegas, 'oppTotal' | 'total' | 'line'> &
  Outsiders & {
    name: string;
  };
