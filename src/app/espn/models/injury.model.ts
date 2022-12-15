import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';

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
  EspnClient.PlayerInjuryStatus.O,
  EspnClient.PlayerInjuryStatus.IR,
  EspnClient.PlayerInjuryStatus.DL7,
  EspnClient.PlayerInjuryStatus.DL10,
  EspnClient.PlayerInjuryStatus.DL15,
  EspnClient.PlayerInjuryStatus.DL60,
  EspnClient.PlayerInjuryStatus.Brv,
  EspnClient.PlayerInjuryStatus.Pat,
]);

export const PlayerStatusAbbrevByInjuryStatusType: { [key in EspnClient.PlayerInjuryStatus]: string } = {
  [EspnClient.PlayerInjuryStatus.Active]: 'Active',
  [EspnClient.PlayerInjuryStatus.Probable]: 'Probable',
  [EspnClient.PlayerInjuryStatus.Ques]: 'Questionable',
  [EspnClient.PlayerInjuryStatus.NotStarting]: 'Not Starting',
  [EspnClient.PlayerInjuryStatus.Starting]: 'Starting',
  [EspnClient.PlayerInjuryStatus.D]: 'Doubtful',
  [EspnClient.PlayerInjuryStatus.O]: 'Out',
  [EspnClient.PlayerInjuryStatus.IR]: 'Injury Reserve',
  [EspnClient.PlayerInjuryStatus.DTD]: 'Day to Day',
  [EspnClient.PlayerInjuryStatus.DL7]: '7 Day DL',
  [EspnClient.PlayerInjuryStatus.DL10]: '10 Day DL',
  [EspnClient.PlayerInjuryStatus.DL15]: '15 Day DL',
  [EspnClient.PlayerInjuryStatus.DL60]: '60 Day DL',
  [EspnClient.PlayerInjuryStatus.Brv]: 'Bereavement',
  [EspnClient.PlayerInjuryStatus.Pat]: 'Paternity',
  [EspnClient.PlayerInjuryStatus.SUS]: 'Suspension',
};

export const MatIconByEspnPlayerInjuryStatus: { [key in EspnClient.PlayerInjuryStatus]: InjuryIcons } = {
  [EspnClient.PlayerInjuryStatus.Active]: InjuryIcons.Healthy,
  [EspnClient.PlayerInjuryStatus.Probable]: InjuryIcons.Healthy,
  [EspnClient.PlayerInjuryStatus.Ques]: InjuryIcons.Questionable,
  [EspnClient.PlayerInjuryStatus.NotStarting]: InjuryIcons.NotStarting,
  [EspnClient.PlayerInjuryStatus.Starting]: InjuryIcons.Starting,
  [EspnClient.PlayerInjuryStatus.D]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.O]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.IR]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.DTD]: InjuryIcons.Questionable,
  [EspnClient.PlayerInjuryStatus.DL7]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.DL10]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.DL15]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.DL60]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.Brv]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.Pat]: InjuryIcons.Injured,
  [EspnClient.PlayerInjuryStatus.SUS]: InjuryIcons.Injured,
};

export const InjurySeverityByInjuryStatus: { [key in EspnClient.PlayerInjuryStatus]: InjurySeverity } = {
  [EspnClient.PlayerInjuryStatus.Active]: InjurySeverity.Positive,
  [EspnClient.PlayerInjuryStatus.Probable]: InjurySeverity.Positive,
  [EspnClient.PlayerInjuryStatus.Ques]: InjurySeverity.SemiSerious,
  [EspnClient.PlayerInjuryStatus.NotStarting]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.Starting]: InjurySeverity.Positive,
  [EspnClient.PlayerInjuryStatus.D]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.O]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.IR]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.DTD]: InjurySeverity.SemiSerious,
  [EspnClient.PlayerInjuryStatus.DL7]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.DL10]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.DL15]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.DL60]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.Brv]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.Pat]: InjurySeverity.Serious,
  [EspnClient.PlayerInjuryStatus.SUS]: InjurySeverity.Serious,
};
