import { MLB_LINEUP } from './consts/lineup.const';
import { MLB_STATS_MAP } from './consts/stats.const';
import { StatAbbrev } from './models/mlb-stats.model';

export function statsKeyMap(obj: Record<number, number>): StatAbbrev {
  const map = {} as StatAbbrev;
  Object.keys(obj).forEach(k => {
    const statAbbrev = MLB_STATS_MAP[k].abbrev.toLowerCase();
    const statValue = obj[k];
    map[statAbbrev] = statValue;
  });
  return map;
}

export const pitcherKeys: Set<MLB_LINEUP> = new Set([MLB_LINEUP.P, MLB_LINEUP.SP, MLB_LINEUP.RP, MLB_LINEUP.P2]);

export function isPitcher(eligiblePos: number[]): boolean {
  for (let i = 0; i < eligiblePos.length; i++) {
    if (pitcherKeys.has(eligiblePos[i])) {
      return true;
    }
    return false;
  }
}
