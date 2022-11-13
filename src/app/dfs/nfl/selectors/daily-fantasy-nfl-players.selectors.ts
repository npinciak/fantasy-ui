import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { PropertyOfType } from '@app/@shared/generic-state/generic.state';
import { linearRegression } from '@app/@shared/helpers/graph.helpers';
import { uniqueBy } from '@app/@shared/helpers/unique-by';
import { exists, existsFilter } from '@app/@shared/helpers/utils';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DailyFantasyPlayersState } from '@app/dfs/state/daily-fantasy-players.state';
import { NFL_TEAM_ID_MAP } from '../consts/nfl.const';
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

        const { name, teamId, position } = p;

        if (exists(gridIron)) {
          const { pown, opp, smash, ceil, floor, tar, fpts, fptsPerK } = gridIron;
        }

        return {
          name,
          teamId,
          position,
          salary,
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

  @Selector([DailyFantasyNflPlayerSelectors.getPlayerTableData])
  static getPlayerScatterAxisOptions(players: NflDfsPlayerTableData[]): FilterOptions<string>[] {
    return [
      { value: 'fpts', label: 'fpts' },
      { value: 'val', label: 'val' },
      { value: 'smash', label: 'smash' },
      { value: 'tar', label: 'tar' },
      { value: 'productionPremium', label: 'productionPremium' },
    ];
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

      const text: string[] = pickAxisData(players, p => p.name);

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

      const points = transformGraphData(players, { xAxis, yAxis, labels: 'name', graphType: 'scatter' });

      return [{ ...points }, { ...fit }];
    };
  }
}

function transformGraphData<T, P extends PropertyOfType<T, string | number>>(
  data: T[],
  opts: { xAxis: string; yAxis: string; labels: P; graphType?: 'scatter' }
) {
  const x = pickAxisData(data, d => d[opts.xAxis]) as number[];
  const y = pickAxisData(data, d => d[opts.yAxis]) as number[];

  const text: string[] = pickAxisData(data, d => d[opts.labels]) as string[];

  return {
    x,
    y,
    text,
    type: opts.graphType,
    mode: 'markers',
    textfont: {
      family: 'Roboto',
    },
    textposition: 'top center',
    marker: { size: 12 },
  };
}

export function pickAxisData<T, U>(data: T[], getter: (t: T) => any): U[] {
  return data.map(d => {
    if (getter(d) !== undefined) {
      return getter(d);
    }
    return [];
  });
}
