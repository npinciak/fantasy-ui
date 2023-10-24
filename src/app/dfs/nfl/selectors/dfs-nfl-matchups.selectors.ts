import { Selector } from '@app/@shared/models/typed-selector';
import { Schedule } from '@app/dfs/models/schedule.model';
import { SlateTeamNfl } from '@app/dfs/models/slate-team.model';
import { Team } from '@app/dfs/models/team.model';
import { Vegas } from '@app/dfs/models/vegas.model';
import { DfsMatchupsSelectors } from '@app/dfs/selectors/dfs-matchups.selectors';
import { hasNonNullableFields } from '@sports-ui/ui-sdk';
import { Outsiders } from '../models/nfl-slate-attributes.model';
import { DfsNflSlateTeamDetailsSelectors } from './dfs-nfl-slate-team-details.selectors';

export class DfsNflMatchupsSelectors extends DfsMatchupsSelectors {
  @Selector([DfsNflMatchupsSelectors.getList, DfsNflSlateTeamDetailsSelectors.getById])
  static getNflMatchupTableData(matchups: Schedule[], slateTeamById: (id: string | null) => SlateTeamNfl | null) {
    return matchups
      .map(m => {
        const { homeTeam, awayTeam, date } = m;

        const slateHomeTeam = slateTeamById(homeTeam.rgId);
        const slateAwayTeam = slateTeamById(awayTeam.rgId);

        const home = transformMatchupTeamToTeamTableRow(slateHomeTeam, homeTeam);
        const away = transformMatchupTeamToTeamTableRow(slateAwayTeam, awayTeam);

        return {
          date,
          movement: home?.movement ?? away?.movement ?? null,
          overUnder: home?.overUnder ?? away?.overUnder ?? null,
          home,
          away,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter(m => m.home != null && m.away != null);
  }

  @Selector([DfsNflMatchupsSelectors.getNflMatchupTableData])
  static getTopFiveMatchupsByOverUnder(matchups: NflMatchupTableRow[]) {
    return matchups
      .sort((a, b) => {
        if (a.overUnder == null || b.overUnder == null) return 0;

        return b.overUnder - a.overUnder;
      })
      .slice(0, 5);
  }

  @Selector([DfsNflMatchupsSelectors.getNflMatchupTableData])
  static getTopFiveTeamTotals(matchups: NflMatchupTableRow[]): NflMatchupTableRow[] {
    return [].slice(0, 5);
  }
}

function transformMatchupTeamToTeamTableRow(slateTeam: SlateTeamNfl | null, team: Team): NflMatchupTableRowTeam | null {
  const { name } = team;

  if (!slateTeam) return null;

  if (!hasNonNullableFields(slateTeam, ['vegas', 'outsiders'])) return null;

  const { total, line, oppTotal, movement, overUnder } = slateTeam.vegas;

  return {
    name,
    ...slateTeam.outsiders,
    oppTotal: oppTotal ?? null,
    total: total ?? null,
    line: line ?? null,
    movement: movement ?? null,
    overUnder: overUnder ?? null,
  };
}

type NflMatchupTableRow = Pick<Vegas, 'movement' | 'overUnder'> & {
  date: string;
  home: NflMatchupTableRowTeam;
  away: NflMatchupTableRowTeam;
};

type NflMatchupTableRowTeam = Vegas & Outsiders & { name: string | null };
