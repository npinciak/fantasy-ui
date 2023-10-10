import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { SlateTeamNfl } from '@app/dfs/models/slate-team.model';
import { DfsTeamsSelectors } from '@app/dfs/selectors/dfs-teams.selectors';
import { DfsSlatePlayersState } from '@app/dfs/state/dfs-slate-players.state';
import { NFL_RG_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { exists, existsFilter, pickData, uniqueBy } from '@sports-ui/ui-sdk/helpers';
import { GridIronPlayer } from '../models/nfl-gridIron.model';
import { NflDfsPlayerTableData } from '../models/nfl-player.model';
import { DfsNflGridIronSelectors } from './dfs-nfl-grid-iron.selectors';
import { DfsNflSlateTeamDetailsSelectors } from './dfs-nfl-slate-team.selectors';

export class DfsNflPlayerSelectors extends GenericSelector(DfsSlatePlayersState) {
  @Selector([DfsNflPlayerSelectors.getList])
  static getPlayerTeams(list: SlatePlayer[]) {
    const teams = existsFilter(list.map(p => p.rgTeamId));
    return uniqueBy(teams, t => t);
  }

  @Selector([DfsNflPlayerSelectors.getList])
  static getPlayerPositions(list: SlatePlayer[]) {
    const positions = existsFilter(list.map(p => p.position));
    return uniqueBy(positions, t => t);
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTeams])
  static getPlayerTeamsFilterOptions(list: string[]): FilterOptions<string | null>[] {
    const reset = [{ value: 'All', label: 'All' }];
    const teams = list.map(t => ({ value: t, label: NFL_RG_TEAM_ID_MAP[t] as string })).sort((a, b) => a.label.localeCompare(b.label));

    return [...reset, ...teams];
  }

  @Selector([DfsNflPlayerSelectors.getPlayerPositions])
  static getPlayerPositionFilterOptions(list: string[]): FilterOptions<string | null>[] {
    const reset = [{ value: null, label: 'All' }];
    const positions = list.map(p => ({ value: p, label: p }));

    return [...reset, ...positions];
  }

  @Selector([DfsNflPlayerSelectors.getList, DfsNflGridIronSelectors.getById, DfsNflSlateTeamDetailsSelectors.getById])
  static getPlayerTableData(
    list: SlatePlayer[],
    gridIronById: (id: string | null) => GridIronPlayer | null,
    teamMatchupById: (rgId: string | null) => SlateTeamNfl | null
  ): NflDfsPlayerTableData[] {
    return list
      .map(p => {
        const matchup = teamMatchupById(p.rgTeamId);

        const salary = exists(p.salaries) ? Number(p.salaries[0].salary) : 0;
        const gridIron = gridIronById(p.rgId);

        const { id, name, rgTeamId, position } = p;

        return {
          id,
          name,
          rgTeamId,
          position,
          salary,
          oppRushDefRank: matchup?.outsiders?.oppRuDefRk,
          oppPassDefRank: matchup?.outsiders?.oppPaDefRk,
          pown: gridIron ? gridIron.pown : null,
          opp: gridIron ? gridIron.opp : null,
          smash: gridIron ? gridIron.smash : null,
          ceil: gridIron ? gridIron.ceil : null,
          floor: gridIron ? gridIron.floor : null,
          tar: gridIron ? gridIron.tar : null,
          fpts: gridIron ? gridIron.fpts : null,
          fptsPerDollar: gridIron ? gridIron.fptsPerDollar : null,
          val: gridIron ? gridIron.value : null,
        };
      })
      .filter(p => p.opp != null)
      .sort((a, b) => b.salary - a.salary);
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTableData, DfsTeamsSelectors.getById, DfsNflSlateTeamDetailsSelectors.getById])
  static getPlayersWithHighestPown(
    tableData: NflDfsPlayerTableData[],
    teamById: ReturnType<typeof DfsTeamsSelectors.getById>,
    teamMatchupById: (rgId: string | null) => SlateTeamNfl | null
  ): { pown: number | null; teamName: string }[] {
    const teamMap = new Map<string, number>();

    tableData.forEach(player => {
      if (teamMap.has(player.rgTeamId!)) {
        teamMap.set(player.rgTeamId!, teamMap.get(player.rgTeamId!)! + player.pown!);
      } else {
        teamMap.set(player.rgTeamId!, player.pown!);
      }
    });

    return [...teamMap]
      .map(([key, value]) => {
        const pown = value;
        const teamName = teamById(key)?.name ?? '';

        return { pown, teamName };
      })
      .sort((a, b) => b.pown - a.pown)
      .slice(0, 10);
  }

  @Selector()
  static getPlayerScatterAxisOptions(): FilterOptions<string>[] {
    return [
      { value: 'pown', label: 'Own %' },
      { value: 'fpts', label: 'Fantasy Pts' },
      { value: 'fptsPerK', label: 'fptsPerK' },
      { value: 'ceil', label: 'Ceil' },
      { value: 'floor', label: 'Floor' },
      { value: 'salary', label: 'Salary' },
      { value: 'val', label: 'Value' },
      { value: 'smash', label: 'Smash' },
      { value: 'tar', label: 'Targets' },
      { value: 'productionPremium', label: 'Production Premium' },
    ].sort((a, b) => a.label.localeCompare(b.label));
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTableData])
  static getPlayerScatterData(data: NflDfsPlayerTableData[]): (xAxis: string | null, yAxis: string | null) => any {
    return (xAxis: string | null, yAxis: string | null) => {
      if (xAxis == null || yAxis == null) return [];

      const x: number[] = data.map(p => p[xAxis]);

      const y: number[] = data.map(p => p[yAxis]);

      const lR = linearRegression(x, y);

      const text: string[] = pickData(data, p => p.name);

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
        dataLabels: 'name',
        graphType: 'scatter',
      });

      return [{ ...points }, { ...fit }];
    };
  }
}
