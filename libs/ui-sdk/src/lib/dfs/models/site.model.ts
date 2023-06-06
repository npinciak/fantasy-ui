export enum DfsSite {
  Draftkings = 'draftkings',
  Fanduel = 'fanduel',
  Yahoo = 'yahoo',
  Superdraft = 'superdraft',
}

export const SITE = {
  Draftkings: 'draftkings',
  Fanduel: 'fanduel',
  Yahoo: 'yahoo',
  Superdraft: 'superdraft',
} as const;

export enum DfsSiteType {
  FanDuel = 2,
  DraftKings = 20,
  Yahoo = 50,
  Superdraft = 70,
}

export const DFS_SITE_TO_DFS_SITETYPE_MAP: { [key in DfsSite]: DfsSiteType } = {
  [DfsSite.Fanduel]: DfsSiteType.FanDuel,
  [DfsSite.Draftkings]: DfsSiteType.DraftKings,
  [DfsSite.Yahoo]: DfsSiteType.Yahoo,
  [DfsSite.Superdraft]: DfsSiteType.Superdraft,
} as const;
