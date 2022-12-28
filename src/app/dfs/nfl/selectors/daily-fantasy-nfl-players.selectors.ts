import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, pickData, transformGraphData } from '@app/@shared/helpers/graph.helpers';
import { exists, existsFilter } from '@app/@shared/helpers/utils';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DailyFantasyPlayersState } from '@app/dfs/state/daily-fantasy-players.state';
import { uniqueBy } from 'sports-ui-sdk';
import { NFL_TEAM_ID_MAP } from '../consts/nfl-dfs-table.const';
import { GridIronPlayer } from '../models/nfl-gridIron.model';
import { NflDfsPlayerTableData } from '../models/nfl-player.model';
import { ProfilerQB, ProfilerRB, ProfilerReceiver } from '../models/nfl-profiler.model';
import { DailyFantasyNflGridIronSelectors } from './daily-fantasy-nfl-grid-iron.selectors';
import { DailyFantasyNflProfilerQBSelectors } from './daily-fantasy-nfl-profiler-qb.selectors';
import { DailyFantasyNflProfilerRBSelectors } from './daily-fantasy-nfl-profiler-rb.selectors';
import { DailyFantasyNflProfilerTESelectors } from './daily-fantasy-nfl-profiler-te.selectors';
import { DailyFantasyNflProfilerWRSelectors } from './daily-fantasy-nfl-profiler-wr.selectors';

export class DailyFantasyNflPlayerSelectors extends GenericSelector(DailyFantasyPlayersState) {
  @Selector([DailyFantasyNflPlayerSelectors.getList])
  static getPlayerTeams(list: SlatePlayer[]) {
    const teams = existsFilter(list.map(p => p.teamId));
    return uniqueBy(teams, t => t).map(t => Number(t));
  }
  zz;

  @Selector([DailyFantasyNflPlayerSelectors.getList])
  static getPlayerPositions(list: SlatePlayer[]) {
    const positions = existsFilter(list.map(p => p.position));
    return uniqueBy(positions, t => t);
  }

  @Selector([DailyFantasyNflPlayerSelectors.getPlayerTeams])
  static getPlayerTeamsFilterOptions(list: number[]): FilterOptions<number | null>[] {
    const reset = [{ value: null, label: 'All' }];
    const teams = list.map(t => ({ value: t, label: NFL_TEAM_ID_MAP[t] as string })).sort((a, b) => a.label.localeCompare(b.label));

    return [...reset, ...teams];
  }

  @Selector([DailyFantasyNflPlayerSelectors.getPlayerPositions])
  static getPlayerPositionFilterOptions(list: string[]): FilterOptions<string | null>[] {
    const reset = [{ value: null, label: 'All' }];
    const positions = list.map(p => ({ value: p, label: p }));

    return [...reset, ...positions];
  }

  @Selector([
    DailyFantasyNflPlayerSelectors.getList,
    DailyFantasyNflGridIronSelectors.getById,
    DailyFantasyNflProfilerQBSelectors.getById,
    DailyFantasyNflProfilerRBSelectors.getById,
    DailyFantasyNflProfilerWRSelectors.getById,
    DailyFantasyNflProfilerTESelectors.getById,
  ])
  static getPlayerTableData(
    list: SlatePlayer[],
    gridIronById: (id: string | null) => GridIronPlayer | null,
    playerProfilerQbById: (rgId: string | null) => ProfilerQB | null,
    playerProfilerRbById: (rgId: string | null) => ProfilerRB | null,
    playerProfilerWrById: (rgId: string | null) => ProfilerReceiver | null,
    playerProfilerTeById: (rgId: string | null) => ProfilerReceiver | null
  ): NflDfsPlayerTableData[] {
    return list
      .map(p => {
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

        const targetShare =
          playerProfilerWr != null ? playerProfilerWr.targetShare : playerProfilerTe != null ? playerProfilerTe.targetShare : null;

        const dominatorRating =
          playerProfilerWr != null ? playerProfilerWr.dominatorRating : playerProfilerTe != null ? playerProfilerTe.dominatorRating : null;

        const protectionRate = playerProfilerQb != null ? playerProfilerQb.protectionRate : null;
        const truePasserRating = playerProfilerQb != null ? playerProfilerQb.truePasserRating : null;
        const pressuredCompletionPercentage = playerProfilerQb != null ? playerProfilerQb.pressuredCompletionPercentage : null;

        const { name, teamId, position } = p;

        if (exists(gridIron)) {
          const { pown, opp, smash, ceil, floor, tar, fpts, fptsPerK } = gridIron;
        }

        return {
          name,
          teamId,
          position,
          salary,
          dominatorRating,
          protectionRate,
          truePasserRating,
          pressuredCompletionPercentage,
          targetShare,
          // pown,
          // opp,
          // smash,
          // ceil,
          // floor,
          // tar,
          // fpts,
          // fptsPerK,
          // val,
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
      .filter(p => p.opp != null);
  }

  // @Selector([DailyFantasyNflPlayerSelectors.getPlayerTableData])
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

  @Selector([DailyFantasyNflPlayerSelectors.getPlayerTableData])
  static getPlayerScatterData(players: NflDfsPlayerTableData[]): (xAxis: string | null, yAxis: string | null) => any {
    return (xAxis: string | null, yAxis: string | null) => {
      if (xAxis == null || yAxis == null) {
        return [];
      }

      const x: number[] = players.map(p => p[xAxis]);

      const y: number[] = players.map(p => p[yAxis]);

      const lR = linearRegression(x, y);

      const text: string[] = pickData(players, p => p.name);

      const fitFrom = Math.min(...x);
      const fitTo = Math.max(...x);

      const fit = {
        x: [fitFrom, fitTo],
        y: [fitFrom * lR.sl + lR.off, fitTo * lR.sl + lR.off],
        text,
        mode: 'lines',
        type: 'scatter',
        // name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
      };

      const points = transformGraphData(players, {
        x,
        y,
        xAxisLabel: xAxis,
        yAxisLabel: yAxis,
        labels: 'name',
        graphType: 'scatter',
      });

      return [{ ...points }, { ...fit }];
    };
  }
}
