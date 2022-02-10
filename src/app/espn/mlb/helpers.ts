import { MLB_STATS_MAP } from './consts/stats.const';
import { MLBLineup } from './mlb.enums';
import { StatAbbrev } from './models/mlb-stats.model';

export function statsKeyMap(obj: Record<number, number>): StatAbbrev {
  const map = {} as StatAbbrev;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const statAbbrev = MLB_STATS_MAP[key].abbrev.toLowerCase();
      const statValue = obj[key];
      map[statAbbrev] = statValue;
    }
  }
  return map;
}

export const pitcherKeys = new Set([MLBLineup.P, MLBLineup.SP, MLBLineup.RP, MLBLineup.P2]);

export function isPitcher(eligiblePos: number[]): boolean {
  for (let i = 0; i < eligiblePos.length; i++) {
    if (pitcherKeys.has(eligiblePos[i])) {
      return true;
    }
    return false;
  }
}
