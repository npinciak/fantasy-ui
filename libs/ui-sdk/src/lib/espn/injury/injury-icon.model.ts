import { PLAYER_INJURY_STATUS, PlayerInjuryStatus } from './injury-status.model';

export const INJURY_ICONS_FA = {
  Healthy: '',
  Questionable: 'fa-solid fad fa-question',
  Injured: 'fa-solid fad fa-briefcase-medical',
  Starting: 'fa-solid fad fa-shield-check',
  NotStarting: 'fa-solid fad fa-exclamation',
} as const;

export const FA_ICON_BY_INJURY_STATUS: { [key in PlayerInjuryStatus]: FaInjuryIcons } = {
  [PLAYER_INJURY_STATUS.Active]: INJURY_ICONS_FA.Healthy,
  [PLAYER_INJURY_STATUS.Probable]: INJURY_ICONS_FA.Starting,
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

export type FaInjuryIcons = typeof INJURY_ICONS_FA[keyof typeof INJURY_ICONS_FA];
