import { PLAYER_INJURY_STATUS, PlayerInjuryStatus } from './injury-status.model';

export const enum InjurySeverity {
  Serious,
  SemiSerious,
  Positive,
}

export type InjurySeverityClass = typeof INJURY_SEVERITY_CLASS[keyof typeof INJURY_SEVERITY_CLASS];
export type InjurySeverityColor = typeof INJURY_SEVERITY_COLOR[keyof typeof INJURY_SEVERITY_COLOR];

export const INJURY_SEVERITY_COLOR = {
  Serious: '#cb0123',
  SemiSerious: '#E8B436',
  Positive: '#267851',
} as const;

export const INJURY_SEVERITY_CLASS: { [key in InjurySeverity]: string } = {
  [InjurySeverity.Serious]: 'text-red-600',
  [InjurySeverity.SemiSerious]: 'text-yellow-400',
  [InjurySeverity.Positive]: 'text-green-600',
} as const;

export const INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY: { [key in InjurySeverity]: InjurySeverityColor } = {
  [InjurySeverity.Serious]: INJURY_SEVERITY_COLOR.Serious,
  [InjurySeverity.SemiSerious]: INJURY_SEVERITY_COLOR.SemiSerious,
  [InjurySeverity.Positive]: INJURY_SEVERITY_COLOR.Positive,
} as const;

export const INJURY_SEVERITY_CLASS_BY_INJURY_SEVERITY: { [key in InjurySeverity]: InjurySeverityClass } = {
  [InjurySeverity.Serious]: INJURY_SEVERITY_CLASS[InjurySeverity.Serious],
  [InjurySeverity.SemiSerious]: INJURY_SEVERITY_CLASS[InjurySeverity.SemiSerious],
  [InjurySeverity.Positive]: INJURY_SEVERITY_CLASS[InjurySeverity.Positive],
} as const;

export const INJURY_SEVERITY_BY_INJURY_STATUS: { [key in PlayerInjuryStatus]: InjurySeverity } = {
  [PLAYER_INJURY_STATUS.Active]: InjurySeverity.Positive,
  [PLAYER_INJURY_STATUS.Probable]: InjurySeverity.Positive,
  [PLAYER_INJURY_STATUS.Ques]: InjurySeverity.SemiSerious,
  [PLAYER_INJURY_STATUS.NotStarting]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.Starting]: InjurySeverity.Positive,
  [PLAYER_INJURY_STATUS.D]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.O]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.IR]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DTD]: InjurySeverity.SemiSerious,
  [PLAYER_INJURY_STATUS.DL7]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DL10]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DL15]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DL60]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.Brv]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.Pat]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.SUS]: InjurySeverity.Serious,
} as const;

export const INJURY_STATUS_FILTER: { value: boolean | null; label: string }[] = [
  { value: null, label: 'All' },
  { value: false, label: 'Healthy' },
  { value: true, label: 'IL-Eligibile' },
];
