import { PLAYER_AVAILABILITY_STATUS } from './player-availability.const';

export type PlayerAvailabilityStatus = (typeof PLAYER_AVAILABILITY_STATUS)[keyof typeof PLAYER_AVAILABILITY_STATUS];
