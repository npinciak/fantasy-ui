import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { DfsTeamsSelectors } from '@app/dfs/selectors/dfs-teams.selectors';
import { DfsSlatePlayersState } from '@app/dfs/state/dfs-slate-players.state';
import { NFL_RG_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { exists, existsFilter, pickData, uniqueBy } from '@sports-ui/ui-sdk/helpers';
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
          playerProfilerQb?.productionPremium ??
          playerProfilerRb?.productionPremium ??
          playerProfilerWr?.productionPremium ??
          playerProfilerTe?.productionPremium ??
          null;

        const matchupRtg = playerProfilerWr?.matchupRtg ?? null;

        const weeklyVolatility =
          playerProfilerQb?.weeklyVolatility ??
          playerProfilerRb?.weeklyVolatility ??
          playerProfilerWr?.weeklyVolatility ??
          playerProfilerTe?.weeklyVolatility ??
          null;

        const redZoneTargetShare = playerProfilerWr?.redZoneTargetShare ?? playerProfilerTe?.redZoneTargetShare ?? null;

        const gameScript = playerProfilerRb?.gameScript ?? null;

        const goalLineCarriesPerGame = playerProfilerRb?.goalLineCarriesPerGame ?? null;

        const targetShare = playerProfilerWr?.targetShare ?? playerProfilerTe?.targetShare ?? null;

        const dominatorRating = playerProfilerWr?.dominatorRating ?? playerProfilerTe?.dominatorRating ?? null;

        const protectionRate = playerProfilerQb?.protectionRate ?? null;
        const truePasserRating = playerProfilerQb?.truePasserRating ?? null;
        const pressuredCompletionPercentage = playerProfilerQb?.pressuredCompletionPercentage ?? null;

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

  // static getTeamsWithHighestPown(): string[] {
  //   const playerTableData = DfsNflPlayerSelectors.getPlayerTableData(DfsSlatePlayersState.getState());
  //   const teams = new Map<string, number>();
  //   let highestPown = 0;

  //   playerTableData.forEach(player => {
  //     if (teams.has(player.teamId)) {
  //       teams.set(player.teamId, teams.get(player.teamId)! + player.pown);
  //     } else {
  //       teams.set(player.teamId, player.pown);
  //     }
  //   });

  //   for (const [teamId, pown] of teams.entries()) {
  //     if (pown > highestPown) {
  //       highestPown = pown;
  //     }
  //   }

  //   const teamsWithHighestPown = [];

  //   for (const [teamId, pown] of teams.entries()) {
  //     if (pown === highestPown) {
  //       teamsWithHighestPown.push(teamId);
  //     }
  //   }

  //   return teamsWithHighestPown;
  // }

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
