import { mlbStatMap, StatAbbrev } from './maps/mlb-stat.map';
import { MLBLineup } from './mlb.enums';

const statsKeyMap = (obj): StatAbbrev => {
  const final: { [key: string]: number } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const statAbbrev = mlbStatMap[key].abbrev.toLowerCase();
      const statValue = obj[key];
      final[statAbbrev] = statValue;
    }
  }
  return final;
};

const pitcherKeys = new Set([
  MLBLineup.P,
  MLBLineup.SP,
  MLBLineup.RP,
  MLBLineup.P2,
]);

const isPitcher = (eligiblePos) => {
  let count = 0;
  for (const key in eligiblePos) {
    if (Object.prototype.hasOwnProperty.call(eligiblePos, key)) {
      if (pitcherKeys.has(+key)) {
        count += 1;
      }
    }
  }
  return count > 0;
};

export { statsKeyMap, isPitcher };
