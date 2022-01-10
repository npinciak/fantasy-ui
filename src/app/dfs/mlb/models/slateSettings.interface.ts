/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface SiteSlateConfig {
  draftkings: SiteConfig;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */

export interface SiteConfig {
  mlb: Configs;
  nfl: Configs;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */

export interface Configs {
  id: number;
  types: SlateTypes;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface SlateTypes {
  classic: SlateConfig;
  showdown: SlateConfig;
  pickem: SlateConfig;
  short: SlateConfig;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */

export interface SlateConfig {
  salaryCap: number;
  slots: Slot[];
  fpts_multipliers: Multiplier;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface Slot {
  posName: string;
  posOpts: { [id: number]: string };
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface Multiplier {
  [id: number]: number;
}
