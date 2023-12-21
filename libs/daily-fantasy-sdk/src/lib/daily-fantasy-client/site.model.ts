export type Site = typeof SITE[keyof typeof SITE];

export enum ClientSiteType {
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
  [SITE.Fanduel]: ClientSiteType.FanDuel,
  [SITE.Draftkings]: ClientSiteType.DraftKings,
  [SITE.Yahoo]: ClientSiteType.Yahoo,
  [SITE.Superdraft]: ClientSiteType.Superdraft,
} as const;
