import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '@app/dfs/models/player.model';
import { SlateTeamNfl } from '@app/dfs/models/slate-team.model';
import { DfsSelectedSlateConfigurationSelectors } from '@app/dfs/selectors/dfs-selected-slate-configuration.selectors';
import { DfsTeamsSelectors } from '@app/dfs/selectors/dfs-teams.selectors';
import { DfsSlatePlayersState } from '@app/dfs/state/dfs-slate-players.state';
import { NFL_RG_TEAM_ID_MAP } from '@sports-ui/daily-fantasy-sdk/football';
import { exists, existsFilter, hasNonNullableFields, uniqueBy } from '@sports-ui/ui-sdk/helpers';
import { TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE } from '../helpers/target-value-calculator/target-value-by-position.const';
import { TargetValueCalculator } from '../helpers/target-value-calculator/target-value-calculator';
import { NflDfsPlayerTableData } from '../models/nfl-player.model';
import { DfsNflSlateTeamDetailsSelectors } from './dfs-nfl-slate-team-details.selectors';

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

  @Selector([DfsNflPlayerSelectors.getList, DfsNflSlateTeamDetailsSelectors.getById, DfsSelectedSlateConfigurationSelectors.slices.site])
  static getPlayerTableData(
    list: SlatePlayer[],
    teamMatchupById: (rgId: string | null) => SlateTeamNfl | null,
    dfsSite: string
  ): NflDfsPlayerTableData[] {
    return (
      list
        .map(p => {
          const matchup = teamMatchupById(p.rgTeamId);

          const salary = exists(p.salaries) ? Number(p.salaries[0].salary) : 0;

          const { id, name, rgTeamId, position } = p;

          const { valueTargetGPPs, valueTargetCash, targetValueDiffGPPs, targetValueDiffCash } = new TargetValueCalculator({
            salary,
            fantasyPoints: 0,
            position,
            dfsSite,
            configuration: TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE,
          });

          return {
            id,
            name,
            rgTeamId,
            position,
            salary,
            playerSiteId: p.salaries ? p.salaries[0].player_id : null,
            oppRushDefRank: matchup?.outsiders?.oppRuDefRk ?? null,
            oppPassDefRank: matchup?.outsiders?.oppPaDefRk ?? null,
            pown: 0,
            opp: null,
            smash: null,
            ceil: null,
            sdCeil: null,
            floor: null,
            sdFloor: null,
            tar: null,
            fpts: null,
            sdFpts: null,
            fptsPerDollar: null,
            value: null,
            valueTargetGPPs,
            valueTargetCash,
            targetValueDiffGPPs,
            targetValueDiffCash,
          };
        })
        // .filter(p => p.opp != null)
        .sort((a, b) => b.salary! - a.salary!)
    );
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTableData, DfsTeamsSelectors.getById])
  static getTeamsWithHighestPown(
    tableData: NflDfsPlayerTableData[],
    teamById: ReturnType<typeof DfsTeamsSelectors.getById>
  ): { pown: number | null; teamName: string }[] {
    const teamMap = new Map<string, number>();

    tableData.forEach(player => {
      if (!hasNonNullableFields(player, ['rgTeamId', 'pown'])) return;

      const { rgTeamId, pown } = player;

      if (teamMap.has(rgTeamId)) {
        teamMap.set(rgTeamId, teamMap.get(rgTeamId)! + pown);
      } else {
        teamMap.set(rgTeamId, pown);
      }
    });

    return [...teamMap]
      .map(([key, value]) => {
        const pown = value;
        const teamName = teamById(key)?.name ?? '';

        return { pown, teamName };
      })
      .sort((a, b) => b.pown - a.pown)
      .filter(p => p.pown > 0)
      .slice(0, 10);
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTableData, DfsTeamsSelectors.getById])
  static getTeamsWithHighestValue(
    tableData: NflDfsPlayerTableData[],
    teamById: ReturnType<typeof DfsTeamsSelectors.getById>
  ): { value: number | null; teamName: string }[] {
    const teamMap = new Map<string, number>();

    tableData.forEach(player => {
      if (teamMap.has(player.rgTeamId!)) {
        teamMap.set(player.rgTeamId!, teamMap.get(player.rgTeamId!)! + player.value!);
      } else {
        teamMap.set(player.rgTeamId!, player.value!);
      }
    });

    return [...teamMap]
      .map(([key, value]) => {
        const teamName = teamById(key)?.name ?? '';

        return { value, teamName };
      })
      .sort((a, b) => b.value - a.value)
      .filter(p => p.value > 0)
      .slice(0, 10);
  }

  @Selector()
  static getPlayerScatterAxisOptions(): FilterOptions<keyof NflDfsPlayerTableData>[] {
    return [
      { value: 'pown', label: 'Own %' },
      { value: 'fpts', label: 'Fantasy Pts' },
      { value: 'fptsPerDollar', label: 'fptsPerK' },
      { value: 'ceil', label: 'Ceil' },
      { value: 'floor', label: 'Floor' },
      { value: 'salary', label: 'Salary' },
      { value: 'value', label: 'Value' },
      { value: 'smash', label: 'Smash' },
    ];
  }
}
