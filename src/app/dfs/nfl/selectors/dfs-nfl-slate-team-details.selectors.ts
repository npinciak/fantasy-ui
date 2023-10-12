import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlateTeam } from '@app/dfs/models/slate-team.model';
import { NFL_RG_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { exists, existsFilter } from '@sports-ui/ui-sdk/helpers';
import { DfsNflSlateTeamDetailsState } from '../state/dfs-nfl-slate-team-details.state';

export class DfsNflSlateTeamDetailsSelectors extends GenericSelector(DfsNflSlateTeamDetailsState) {
  @Selector([DfsNflSlateTeamDetailsSelectors.getList])
  static getMatchupGraphData(data: SlateTeam[]): (xAxis: string, yAxis: string) => any {
    return (xAxis: string, yAxis: string) => {
      const x = data
        .map(t => (exists(t.vegas) ? t.vegas['o/u'] : 0))
        .filter(d => d !== 0)
        .sort((a, b) => b - a);

      const y = existsFilter(data.map(t => (exists(t.vegas) ? t.vegas.total : 0)).filter(d => d !== 0)).sort((a, b) => b - a);

      const lR = linearRegression(x, y);

      const text = data.map(p => NFL_RG_TEAM_ID_MAP[p.id]);

      const type = 'scatter';

      const fitFrom = Math.min(...x);
      const fitTo = Math.max(...x);

      const fit = {
        x: [fitFrom, fitTo],
        y: [fitFrom * lR.slope + lR.yIntercept, fitTo * lR.slope + lR.yIntercept],
        text,
        mode: 'lines',
        type: 'scatter',
        name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
      };

      const points = transformScatterGraphData({
        data,
        x,
        y,
        xAxisLabel: xAxis,
        yAxisLabel: yAxis,
        dataLabels: 'id',
        graphType: 'scatter',
      });

      return [{ ...points }, { ...fit }];
    };
  }
}
