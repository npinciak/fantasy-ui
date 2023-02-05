import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression } from '@app/@shared/helpers/graph.helpers';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists, existsFilter } from '@app/@shared/utilities/utilities.m';
import { SlateTeam } from '@app/dfs/models/slate-team.model';
import { DfsNflTeams } from 'sports-ui-sdk';
import { DfsNflSlateTeamDetailsState } from '../state/dfs-nfl-slate-teams.state';

export class DfsNflSlateTeamDetailsSelectors extends GenericSelector(DfsNflSlateTeamDetailsState) {
  @Selector([DfsNflSlateTeamDetailsSelectors.getList])
  static getMatchupGraphData(teams: SlateTeam[]): (xAxis: string, yAxis: string) => any {
    return (xAxis: string, yAxis: string) => {
      const x = teams
        .map(t => (exists(t.vegas) ? t.vegas['o/u'] : 0))
        .filter(d => d !== 0)
        .sort((a, b) => b - a);

      const y = existsFilter(teams.map(t => (exists(t.vegas) ? t.vegas.total : 0)).filter(d => d !== 0)).sort((a, b) => b - a);

      const lR = linearRegression(x, y);

      const text = teams.map(p => DfsNflTeams.NFL_RG_TEAM_ID_MAP[p.id]);

      const type = 'scatter';

      const fitFrom = Math.min(...x);
      const fitTo = Math.max(...x);

      const fit = {
        x: [fitFrom, fitTo],
        y: [fitFrom * lR.sl + lR.off, fitTo * lR.sl + lR.off],
        text,
        mode: 'lines',
        type: 'scatter',
        name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
      };

      const points = {
        x,
        y,
        text,
        type,
        mode: 'markers+text',
        textfont: {
          family: 'Roboto',
        },
        textposition: 'top center',
        marker: { size: 12 },
      };

      return [{ ...points }, { ...fit }];
    };
  }
}
