import { InjuryStatusType } from '@app/espn/models/injury.model';
import { MOCK_PLAYER_1, MOCK_PLAYER_2 } from '@app/espn/models/player.model.mock';
import { MLB_LINEUP_MAP } from '../consts/lineup.const';
import { PlayingStatus } from '../mlb.enums';
import { BaseballPlayer } from './baseball-player.model';

export const MOCK_BASEBALL_PLAYER_1: BaseballPlayer = {
  ...MOCK_PLAYER_1,
  isInjured: false,
  injuryStatus: InjuryStatusType.Active,
  playerOwnershipChange: -0.0790885222449873,
  playerOwnershipPercentOwned: 99.70117041587118,
  isPitcher: false,
  lineupSlot: MLB_LINEUP_MAP[2].abbrev,
  lineupSlotId: 2,
  isStarting: true,
  startingStatus: PlayingStatus.Active,
  playerRatings: { 0: { positionalRanking: 1, totalRanking: 20, totalRating: 10.91 } },
  stats: {},
};

export const MOCK_BASEBALL_PLAYER_2: BaseballPlayer = {
  ...MOCK_PLAYER_2,
  isInjured: true,
  injuryStatus: InjuryStatusType.O,
  playerOwnershipChange: -0.107,
  playerOwnershipPercentOwned: 78.70117,
  isPitcher: true,
  lineupSlotId: 1,
  lineupSlot: MLB_LINEUP_MAP[1].abbrev,
  isStarting: true,
  startingStatus: PlayingStatus.Probable,
  playerRatings: { 0: { positionalRanking: 12, totalRanking: 56, totalRating: 44.809 } },
  stats: {},
};
