import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { pickData } from '@app/@shared/utilities/utilities.m';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DfsSlatePlayersState } from '@app/dfs/state/dfs-players.state';
import { NFL_RG_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { exists, existsFilter, uniqueBy } from '@sports-ui/ui-sdk/helpers';
import { GridIronPlayer } from '../models/nfl-gridIron.model';
import { NflDfsPlayerTableData } from '../models/nfl-player.model';
import { ProfilerQB, ProfilerRB, ProfilerReceiver } from '../models/nfl-profiler.model';
import { SlateTeamNfl } from '../models/nfl-slate-attr.model';
import { DfsNflGridIronSelectors } from './dfs-nfl-grid-iron.selectors';
import { DfsNflProfilerQBSelectors } from './dfs-nfl-profiler-qb.selectors';
import { DfsNflProfilerRBSelectors } from './dfs-nfl-profiler-rb.selectors';
import { DfsNflProfilerTESelectors } from './dfs-nfl-profiler-te.selectors';
import { DfsNflProfilerWRSelectors } from './dfs-nfl-profiler-wr.selectors';
import { DfsNflSlateTeamDetailsSelectors } from './dfs-nfl-slate-team.selectors';

export class DfsNflPlayerSelectors extends GenericSelector(DfsSlatePlayersState) {
  @Selector([DfsNflPlayerSelectors.getList])
  static getPlayerTeams(list: SlatePlayer[]) {
    const teams = existsFilter(list.map(p => p.rgTeamId));
    return uniqueBy(teams, t => t).map(t => Number(t));
  }

  @Selector([DfsNflPlayerSelectors.getList])
  static getPlayerPositions(list: SlatePlayer[]) {
    const positions = existsFilter(list.map(p => p.position));
    return uniqueBy(positions, t => t);
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTeams])
  static getPlayerTeamsFilterOptions(list: number[]): FilterOptions<number | null>[] {
    const reset = [{ value: null, label: 'All' }];
    const teams = list.map(t => ({ value: t, label: NFL_RG_TEAM_ID_MAP[t] as string })).sort((a, b) => a.label.localeCompare(b.label));

    return [...reset, ...teams];
  }

  @Selector([DfsNflPlayerSelectors.getPlayerPositions])
  static getPlayerPositionFilterOptions(list: string[]): FilterOptions<string | null>[] {
    const reset = [{ value: null, label: 'All' }];
    const positions = list.map(p => ({ value: p, label: p }));

    return [...reset, ...positions];
  }

  @Selector([
    DfsNflPlayerSelectors.getList,
    DfsNflGridIronSelectors.getById,
    DfsNflProfilerQBSelectors.getById,
    DfsNflProfilerRBSelectors.getById,
    DfsNflProfilerWRSelectors.getById,
    DfsNflProfilerTESelectors.getById,
    DfsNflSlateTeamDetailsSelectors.getById,
  ])
  static getPlayerTableData(
    list: SlatePlayer[],
    gridIronById: (id: string | null) => GridIronPlayer | null,
    playerProfilerQbById: (rgId: string | null) => ProfilerQB | null,
    playerProfilerRbById: (rgId: string | null) => ProfilerRB | null,
    playerProfilerWrById: (rgId: string | null) => ProfilerReceiver | null,
    playerProfilerTeById: (rgId: string | null) => ProfilerReceiver | null,
    teamMatchupById: (rgId: string | null) => SlateTeamNfl | null
  ): NflDfsPlayerTableData[] {
    return list
      .map(p => {
        const matchup = teamMatchupById(p.rgTeamId);

        const salary = exists(p.salaries) ? Number(p.salaries[0].salary) : 0;
        const gridIron = gridIronById(p.rgId);

        const playerProfilerQb = playerProfilerQbById(p.rgId);
        const playerProfilerRb = playerProfilerRbById(p.rgId);
        const playerProfilerWr = playerProfilerWrById(p.rgId);
        const playerProfilerTe = playerProfilerTeById(p.rgId);

        const productionPremium =
          playerProfilerQb != null
            ? playerProfilerQb.productionPremium
            : playerProfilerRb != null
            ? playerProfilerRb.productionPremium
            : playerProfilerWr != null
            ? playerProfilerWr.productionPremium
            : playerProfilerTe != null
            ? playerProfilerTe.productionPremium
            : null;

        const matchupRtg = playerProfilerWr?.matchupRtg;

        const weeklyVolatility =
          playerProfilerQb != null
            ? playerProfilerQb.weeklyVolatility
            : playerProfilerRb != null
            ? playerProfilerRb.weeklyVolatility
            : playerProfilerWr != null
            ? playerProfilerWr.weeklyVolatility
            : playerProfilerTe != null
            ? playerProfilerTe.weeklyVolatility
            : null;

        const redZoneTargetShare =
          playerProfilerWr != null
            ? playerProfilerWr.redZoneTargetShare
            : playerProfilerTe != null
            ? playerProfilerTe.redZoneTargetShare
            : null;

        const gameScript = playerProfilerRb != null ? playerProfilerRb.gameScript : null;
        const goalLineCarriesPerGame = playerProfilerRb != null ? playerProfilerRb.goalLineCarriesPerGame : null;

        const targetShare =
          playerProfilerWr != null ? playerProfilerWr.targetShare : playerProfilerTe != null ? playerProfilerTe.targetShare : null;

        const dominatorRating =
          playerProfilerWr != null ? playerProfilerWr.dominatorRating : playerProfilerTe != null ? playerProfilerTe.dominatorRating : null;

        const protectionRate = playerProfilerQb != null ? playerProfilerQb.protectionRate : null;
        const truePasserRating = playerProfilerQb != null ? playerProfilerQb.truePasserRating : null;
        const pressuredCompletionPercentage = playerProfilerQb != null ? playerProfilerQb.pressuredCompletionPercentage : null;

        const { id, name, rgTeamId, position } = p;

        return {
          id,
          name,
          rgTeamId,
          position,
          salary,
          dominatorRating,
          protectionRate,
          truePasserRating,
          pressuredCompletionPercentage,
          targetShare,
          gameScript,
          goalLineCarriesPerGame,
          oppRushDefRank: matchup?.outsiders?.oppRuDefRk,
          oppPassDefRank: matchup?.outsiders?.oppPaDefRk,
          productionPremium,
          matchupRtg,
          weeklyVolatility,
          redZoneTargetShare,
          pown: exists(gridIron) ? gridIron.pown : null,
          opp: exists(gridIron) ? gridIron.opp : null,
          smash: exists(gridIron) ? gridIron.smash : null,
          ceil: exists(gridIron) ? gridIron.ceil : null,
          floor: exists(gridIron) ? gridIron.floor : null,
          tar: exists(gridIron) ? gridIron.tar : null,
          fpts: exists(gridIron) ? gridIron.fpts : null,
          fptsPerK: exists(gridIron) ? gridIron.fptsPerK : null,
          val: exists(gridIron) ? gridIron.value : null,
        };
      })
      .filter(p => p.opp != null)
      .sort((a, b) => b.salary - a.salary);
  }

  // @Selector([DfsNflPlayerSelectors.getPlayerTableData])
  // static teamOwnPercent(players: NflDfsPlayerTableData[]) {
  //   const teams = new Map<string, NflDfsPlayerTableData[]>();

  //   players.map(p => {
  //     if (teams.has(p.teamId)) {
  //       teams.get(p.teamId)?.push(p);
  //     } else {
  //       teams.set(p.teamId, [p]);
  //     }
  //   });

  //   console.log(teams);

  //   return;
  // }

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
