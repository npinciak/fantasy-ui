export enum PlayerStatusType {
  Active = 'ACTIVE',
  Probable = 'PROBABLE',
  Ques = 'QUESTIONABLE',
  D = 'DOUBTFUL',
  O = 'OUT',
  IR = 'INJURY_RESERVE',
  DTD = 'DAY_TO_DAY',
  DL7 = 'SEVEN_DAY_DL',
  DL10 = 'TEN_DAY_DL',
  DL15 = 'FIFTEEN_DAY_DL',
  DL60 = 'SIXTY_DAY_DL',
  Brv = 'BEREAVEMENT',
  Pat = 'PATERNITY',
  SUS = 'SUSPENSION',
}

export const InjuryStatus = new Set([
  PlayerStatusType.O,
  PlayerStatusType.IR,
  PlayerStatusType.DL7,
  PlayerStatusType.DL10,
  PlayerStatusType.DL15,
  PlayerStatusType.DL60,
  PlayerStatusType.Brv,
  PlayerStatusType.Pat,
]);

export const PlayerStatusAbbrevByInjuryStatusType: { [key in PlayerStatusType]: string } = {
  [PlayerStatusType.Active]: 'Active',
  [PlayerStatusType.Probable]: 'Probable',
  [PlayerStatusType.Ques]: 'Questionable',
  [PlayerStatusType.D]: 'Doubtful',
  [PlayerStatusType.O]: 'Out',
  [PlayerStatusType.IR]: 'Injury Reserve',
  [PlayerStatusType.DTD]: 'Day to Day',
  [PlayerStatusType.DL7]: '7 Day DL',
  [PlayerStatusType.DL10]: '10 Day DL',
  [PlayerStatusType.DL15]: '15 Day DL',
  [PlayerStatusType.DL60]: '60 Day DL',
  [PlayerStatusType.Brv]: 'Bereavement',
  [PlayerStatusType.Pat]: 'Paternity',
  [PlayerStatusType.SUS]: 'Suspension',
};
