import { mlbStatMap, StatAbbrev } from './maps/mlb-stat.map';

const statsKeyMap = (obj): StatAbbrev => {
    const final: { [key: string]: number } = {};
    for (const key in obj) {
        if (key) {
            const statAbbrev = mlbStatMap[key].abbrev.toLowerCase();
            const statValue = obj[key];
            final[statAbbrev] = statValue;
        }
    }
    return final;
};

export { statsKeyMap };
