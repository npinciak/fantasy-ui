import { INJURY_ICONS_FA, INJURY_ICONS_MAT, INJURY_SEVERITY_CLASS, INJURY_SEVERITY_COLOR } from './injury.const';

export const enum InjurySeverity {
  Serious,
  SemiSerious,
  Positive,
}

export type InjurySeverityClass = typeof INJURY_SEVERITY_CLASS[keyof typeof INJURY_SEVERITY_CLASS];
export type InjurySeverityColor = typeof INJURY_SEVERITY_COLOR[keyof typeof INJURY_SEVERITY_COLOR];
export type MatInjuryIcons = typeof INJURY_ICONS_MAT[keyof typeof INJURY_ICONS_MAT];
export type FaInjuryIcons = typeof INJURY_ICONS_FA[keyof typeof INJURY_ICONS_FA];
