import { PlayerInjuryStatus } from '../models/espn-client.model';
import { PLAYER_INJURY_STATUS } from '../models/espn-client.const';
import { InjurySeverityColor, MatInjuryIcons, InjurySeverity, FaInjuryIcons, InjurySeverityClass } from './injury.model';

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

export const INJURY_ICONS_MAT = {
  Healthy: '',
  Questionable: 'warning',
  Injured: 'medical_services',
  Starting: 'check_circle',
  NotStarting: 'error',
} as const;

export const INJURY_ICONS_FA = {
  Healthy: '',
  Questionable: 'fa-solid fad fa-question',
  Injured: 'fa-solid fad fa-briefcase-medical',
  Starting: 'fa-solid fad fa-shield-check',
  NotStarting: 'fa-solid fad fa-exclamation',
} as const;

export const INJURY_STATUS_LIST = [
  PLAYER_INJURY_STATUS.O,
  PLAYER_INJURY_STATUS.IR,
  PLAYER_INJURY_STATUS.DL7,
  PLAYER_INJURY_STATUS.DL10,
  PLAYER_INJURY_STATUS.DL15,
  PLAYER_INJURY_STATUS.DL60,
  PLAYER_INJURY_STATUS.Brv,
  PLAYER_INJURY_STATUS.Pat,
];

export const INJURY_LABEL_BY_INJURY_STATUS: { [key in PlayerInjuryStatus]: string } = {
  [PLAYER_INJURY_STATUS.Active]: 'Active',
  [PLAYER_INJURY_STATUS.Probable]: 'Probable',
  [PLAYER_INJURY_STATUS.Ques]: 'Questionable',
  [PLAYER_INJURY_STATUS.NotStarting]: 'Not Starting',
  [PLAYER_INJURY_STATUS.Starting]: 'Starting',
  [PLAYER_INJURY_STATUS.D]: 'Doubtful',
  [PLAYER_INJURY_STATUS.O]: 'Out',
  [PLAYER_INJURY_STATUS.IR]: 'Injury Reserve',
  [PLAYER_INJURY_STATUS.DTD]: 'Day to Day',
  [PLAYER_INJURY_STATUS.DL7]: '7 Day DL',
  [PLAYER_INJURY_STATUS.DL10]: '10 Day DL',
  [PLAYER_INJURY_STATUS.DL15]: '15 Day DL',
  [PLAYER_INJURY_STATUS.DL60]: '60 Day DL',
  [PLAYER_INJURY_STATUS.Brv]: 'Bereavement',
  [PLAYER_INJURY_STATUS.Pat]: 'Paternity',
  [PLAYER_INJURY_STATUS.SUS]: 'Suspension',
} as const;

export const MAT_ICON_BY_INJURY_STATUS: { [key in PlayerInjuryStatus]: MatInjuryIcons } = {
  [PLAYER_INJURY_STATUS.Active]: INJURY_ICONS_MAT.Healthy,
  [PLAYER_INJURY_STATUS.Probable]: INJURY_ICONS_MAT.Healthy,
  [PLAYER_INJURY_STATUS.Ques]: INJURY_ICONS_MAT.Questionable,
  [PLAYER_INJURY_STATUS.NotStarting]: INJURY_ICONS_MAT.NotStarting,
  [PLAYER_INJURY_STATUS.Starting]: INJURY_ICONS_MAT.Starting,
  [PLAYER_INJURY_STATUS.D]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.O]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.IR]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.DTD]: INJURY_ICONS_MAT.Questionable,
  [PLAYER_INJURY_STATUS.DL7]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.DL10]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.DL15]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.DL60]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.Brv]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.Pat]: INJURY_ICONS_MAT.Injured,
  [PLAYER_INJURY_STATUS.SUS]: INJURY_ICONS_MAT.Injured,
} as const;

export const FA_ICON_BY_INJURY_STATUS: { [key in PlayerInjuryStatus]: FaInjuryIcons } = {
  [PLAYER_INJURY_STATUS.Active]: INJURY_ICONS_FA.Healthy,
  [PLAYER_INJURY_STATUS.Probable]: INJURY_ICONS_FA.Healthy,
  [PLAYER_INJURY_STATUS.Ques]: INJURY_ICONS_FA.Questionable,
  [PLAYER_INJURY_STATUS.NotStarting]: INJURY_ICONS_FA.NotStarting,
  [PLAYER_INJURY_STATUS.Starting]: INJURY_ICONS_FA.Starting,
  [PLAYER_INJURY_STATUS.D]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.O]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.IR]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.DTD]: INJURY_ICONS_FA.Questionable,
  [PLAYER_INJURY_STATUS.DL7]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.DL10]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.DL15]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.DL60]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.Brv]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.Pat]: INJURY_ICONS_FA.Injured,
  [PLAYER_INJURY_STATUS.SUS]: INJURY_ICONS_FA.Injured,
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
