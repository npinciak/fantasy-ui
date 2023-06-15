import { normalizeStringToNumber, objectIsEmpty } from '@app/@shared/helpers/utils';
import { exists } from '@app/@shared/utilities/utilities.m';
import {
  ClientSlatePlayerAttributesMap,
  ClientSlateStatGroups,
  ClientSlateTeamAttributes,
  ClientSlateTeamAttributesMap,
  SITE_TO_SITETYPE_MAP,
} from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

import { SlateWeather } from '@dfsClient/daily-fantasy-client-slate-attr.model';

import { MLBClientTeamAttributes } from '../../../dfs-client-models/mlb-client.model';
import { SlatePlayer } from '../models/slate-player.model';
import { Weather } from '../models/weather.model';
import { PlayerProfilerSeasonMap } from '../nfl/models/nfl-profiler.model';
import { DfsSlateHelpers } from '../slate.helpers';

export function transformMlbSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes, site: string): MLBClientTeamAttributes {
  const obj = {} as MLBClientTeamAttributes;

  // eslint-disable-next-line guard-for-in
  for (const prop in teamAttributes) {
    switch (prop) {
      case 'pitcher':
      case 'vegas':
        obj[prop] = teamAttributes[prop];
        break;
      default:
        obj[prop] = normalizeStringToNumber(teamAttributes[prop][site]);
        break;
    }
  }

  return obj;
}

export function transformTeamSlateAttributes(teams: ClientSlateTeamAttributesMap) {
  if (objectIsEmpty(teams)) return [];

  return Object.entries(teams).map(([id, team]) => {
    const { vegas, outsiders, safpts } = DfsSlateHelpers.normalizeSlateTeamAttributes(team);
    return { id, vegas, outsiders, safpts };
  });
}

export function transformStatGroupsToProfiler(statGroup: ClientSlateStatGroups): PlayerProfilerSeasonMap | null {
  if (objectIsEmpty(statGroup) || !exists(statGroup)) return null;

  return DfsSlateHelpers.normalizeStatGroupToProfiler(statGroup);
}

export function transformPlayerSlateAttributes(players: ClientSlatePlayerAttributesMap, site: string): SlatePlayer[] {
  if (objectIsEmpty(players)) return [];

  const siteMap = SITE_TO_SITETYPE_MAP[site];

  return Object.entries(players).map(([id, player]) => ({
    id,
    statGroup: player.stat_group ?? null,
    salaryDiff: player.salary_diff?.[siteMap] ?? null,
    slateOwn: player.slate_ownership?.[siteMap] ?? null,
    ownership: normalizeStringToNumber(player.ownership?.[siteMap]) ?? null,
    value: normalizeStringToNumber(player.value_pct?.[siteMap]) ?? null,
    smash: normalizeStringToNumber(player.smash_pct?.[siteMap]) ?? null,
  }));
}

export function transformWeather(games: Record<string, SlateWeather>): Weather[] {
  return Object.entries(games).map(([id, game]) => ({
    id,
    ...game.weather,
  }));
}
