import { EspnPlayerInjuryStatus } from '@client/espn-client.model';

export enum InjurySeverityColor {
  Serious = '#cb0123',
  SemiSerious = '#E8B436',
  Positive = '#267851',
}

export enum InjurySeverity {
  Serious,
  SemiSerious,
  Positive,
}

export const InjurySeverityColorByInjurySeverity: { [key in InjurySeverity]: InjurySeverityColor } = {
  [InjurySeverity.Serious]: InjurySeverityColor.Serious,
  [InjurySeverity.SemiSerious]: InjurySeverityColor.SemiSerious,
  [InjurySeverity.Positive]: InjurySeverityColor.Positive,
};

export enum InjuryIcons {
  Healthy = '',
  Questionable = 'warning',
  Injured = 'medical_services',
  Starting = 'check_circle',
  NotStarting = 'error',
}

export const InjuryStatus = new Set([
  EspnPlayerInjuryStatus.O,
  EspnPlayerInjuryStatus.IR,
  EspnPlayerInjuryStatus.DL7,
  EspnPlayerInjuryStatus.DL10,
  EspnPlayerInjuryStatus.DL15,
  EspnPlayerInjuryStatus.DL60,
  EspnPlayerInjuryStatus.Brv,
  EspnPlayerInjuryStatus.Pat,
]);

export const PlayerStatusAbbrevByInjuryStatusType: { [key in EspnPlayerInjuryStatus]: string } = {
  [EspnPlayerInjuryStatus.Active]: 'Active',
  [EspnPlayerInjuryStatus.Probable]: 'Probable',
  [EspnPlayerInjuryStatus.Ques]: 'Questionable',
  [EspnPlayerInjuryStatus.NotStarting]: 'Not Starting',
  [EspnPlayerInjuryStatus.Starting]: 'Starting',
  [EspnPlayerInjuryStatus.D]: 'Doubtful',
  [EspnPlayerInjuryStatus.O]: 'Out',
  [EspnPlayerInjuryStatus.IR]: 'Injury Reserve',
  [EspnPlayerInjuryStatus.DTD]: 'Day to Day',
  [EspnPlayerInjuryStatus.DL7]: '7 Day DL',
  [EspnPlayerInjuryStatus.DL10]: '10 Day DL',
  [EspnPlayerInjuryStatus.DL15]: '15 Day DL',
  [EspnPlayerInjuryStatus.DL60]: '60 Day DL',
  [EspnPlayerInjuryStatus.Brv]: 'Bereavement',
  [EspnPlayerInjuryStatus.Pat]: 'Paternity',
  [EspnPlayerInjuryStatus.SUS]: 'Suspension',
};

export const MatIconByEspnPlayerInjuryStatus: { [key in EspnPlayerInjuryStatus]: InjuryIcons } = {
  [EspnPlayerInjuryStatus.Active]: InjuryIcons.Healthy,
  [EspnPlayerInjuryStatus.Probable]: InjuryIcons.Healthy,
  [EspnPlayerInjuryStatus.Ques]: InjuryIcons.Questionable,
  [EspnPlayerInjuryStatus.NotStarting]: InjuryIcons.NotStarting,
  [EspnPlayerInjuryStatus.Starting]: InjuryIcons.Starting,
  [EspnPlayerInjuryStatus.D]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.O]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.IR]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.DTD]: InjuryIcons.Questionable,
  [EspnPlayerInjuryStatus.DL7]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.DL10]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.DL15]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.DL60]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.Brv]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.Pat]: InjuryIcons.Injured,
  [EspnPlayerInjuryStatus.SUS]: InjuryIcons.Injured,
};

export const InjurySeverityByInjuryStatus: { [key in EspnPlayerInjuryStatus]: InjurySeverity } = {
  [EspnPlayerInjuryStatus.Active]: InjurySeverity.Positive,
  [EspnPlayerInjuryStatus.Probable]: InjurySeverity.Positive,
  [EspnPlayerInjuryStatus.Ques]: InjurySeverity.SemiSerious,
  [EspnPlayerInjuryStatus.NotStarting]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.Starting]: InjurySeverity.Positive,
  [EspnPlayerInjuryStatus.D]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.O]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.IR]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.DTD]: InjurySeverity.SemiSerious,
  [EspnPlayerInjuryStatus.DL7]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.DL10]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.DL15]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.DL60]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.Brv]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.Pat]: InjurySeverity.Serious,
  [EspnPlayerInjuryStatus.SUS]: InjurySeverity.Serious,
};
