import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { Schedule } from '../models/schedule.model';
import { SlateTeamNfl } from '../models/slate-team.model';
import { Team } from '../models/team.model';
import { Vegas } from '../models/vegas.model';
import { Outsiders } from '../nfl/models/nfl-slate-attributes.model';
import { DfsNflSlateTeamDetailsSelectors } from '../nfl/selectors/dfs-nfl-slate-team-details.selectors';
import { DfsMatchupsState } from '../state/dfs-matchups.state';

export class DfsMatchupsSelectors extends GenericSelector(DfsMatchupsState) {
  @Selector([DfsMatchupsSelectors.getList, DfsNflSlateTeamDetailsSelectors.getById])
  static getNflMatchupTableData(matchups: Schedule[], slateTeamById: (id: string | null) => SlateTeamNfl | null) {
    return matchups
      .map(m => {
        const { homeTeam, awayTeam, date } = m;

        const slateHomeTeam = slateTeamById(homeTeam.rgId);
        const slateAwayTeam = slateTeamById(awayTeam.rgId);

        const { movement, overUnder } = slateHomeTeam?.vegas ?? slateAwayTeam?.vegas ?? { line: null, movement: null, overUnder: null };

        return {
          date,
          movement,
          overUnder,
          home: {
            ...slateHomeTeam?.outsiders,
            name: homeTeam.name,
            oppTotal: slateHomeTeam?.vegas?.oppTotal ?? null,
            total: slateHomeTeam?.vegas?.total ?? null,
            line: slateHomeTeam?.vegas?.line ?? null,
          },
          away: {
            ...slateAwayTeam?.outsiders,
            name: awayTeam.name,
            oppTotal: slateAwayTeam?.vegas?.oppTotal ?? null,
            total: slateAwayTeam?.vegas?.total ?? null,
            line: slateAwayTeam?.vegas?.line ?? null,
          },
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  @Selector([DfsMatchupsSelectors.getNflMatchupTableData])
  static getTopFiveMatchupsByOverUnder(matchups: NflMatchupTableRow[]) {
    return matchups
      .sort((a, b) => {
        if (a.overUnder == null || b.overUnder == null) return 0;

        return b.overUnder - a.overUnder;
      })
      .slice(0, 5);
  }

  @Selector([DfsMatchupsSelectors.getNflMatchupTableData])
  static getTopFiveTeamTotals(matchups: NflMatchupTableRow[]) {
    return [].slice(0, 5);
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
  date: string;
  home: NflMatchupTableRowTeam;
  away: NflMatchupTableRowTeam;
};

type NflMatchupTableRowTeam = Pick<Vegas, 'oppTotal' | 'total' | 'line'> &
  Outsiders & {
    name: string;
  };
