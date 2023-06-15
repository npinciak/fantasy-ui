export type Site = typeof SITE[keyof typeof SITE];

export enum SiteType {
  FanDuel = 2,
  DraftKings = 20,
  Yahoo = 50,
  Superdraft = 70,
}

export const SITE = {
  Draftkings: 'draftkings',
  Fanduel: 'fanduel',
  Yahoo: 'yahoo',
  Superdraft: 'superdraft',
} as const;

export const SITE_TO_SITETYPE_MAP = {
  [SITE.Fanduel]: SiteType.FanDuel,
  [SITE.Draftkings]: SiteType.DraftKings,
  [SITE.Yahoo]: SiteType.Yahoo,
  [SITE.Superdraft]: SiteType.Superdraft,
} as const;
