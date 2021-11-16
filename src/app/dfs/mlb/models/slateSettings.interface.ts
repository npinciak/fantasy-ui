/* eslint-disable @typescript-eslint/naming-convention */
export interface SiteSlateConfig {
  draftkings: SiteConfig;
}

export interface SiteConfig {
  mlb: Configs;
  nfl: Configs;
}

export interface Configs {
  id: number;
  types: SlateTypes;
}

export interface SlateTypes {
  classic: SlateConfig;
  showdown: SlateConfig;
  pickem: SlateConfig;
  short: SlateConfig;
}

export interface SlateConfig {
  salaryCap: number;
  slots: Slot[];
  fpts_multipliers: Multiplier;
}

export interface Slot {
  posName: string;
  posOpts: { [id: number]: string };
}

export interface Multiplier {
  [id: number]: number;
}
