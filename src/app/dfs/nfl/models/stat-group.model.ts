export enum NFLStatGroup {
  Kicker = 'nfl-kicker',
  Defense = 'nfl-defense',
  QB = 'nfl-qb',
  Flex = 'nfl-flex',
}

export const NFL_STAT_GROUP_MAP = {
  [NFLStatGroup.QB]: 'QB',
  [NFLStatGroup.Flex]: 'Flex',
  [NFLStatGroup.Kicker]: 'K',
  [NFLStatGroup.Defense]: 'Def',
} as const;
