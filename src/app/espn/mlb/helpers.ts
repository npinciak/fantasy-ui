import { MLB_STATS, StatAbbrev } from './consts/stats.const';
import { MLBLineup } from './mlb.enums';

export function statsKeyMap(obj): Partial<StatAbbrev> {
  const map = {} as Partial<StatAbbrev>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const statAbbrev = MLB_STATS[key].abbrev.toLowerCase();
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

export const logoImgBuilder = (league: 'mlb' | 'nfl', abbrev: string) =>
  `https://a.espncdn.com/combiner/i?img=/i/teamlogos/${league}/500/${abbrev.toLowerCase()}.png&h=100&w=100`;

export const fieldImgBuilder = (id: number) => `https://a.espncdn.com/redesign/assets/img/mlb/fields/${id}.png`;
