export enum InjuryStatusType {
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

export const isInjured = [
  InjuryStatusType.O,
  InjuryStatusType.IR,
  InjuryStatusType.DL7,
  InjuryStatusType.DL10,
  InjuryStatusType.DL15,
  InjuryStatusType.DL60,
  InjuryStatusType.Brv,
  InjuryStatusType.Pat,
];
