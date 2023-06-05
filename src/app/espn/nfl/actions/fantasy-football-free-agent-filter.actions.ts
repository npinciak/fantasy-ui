import { FootballLineupSlot, PlayerAvailabilityStatus } from 'sports-ui-sdk';

const name = 'fantasyFootballFreeAgentFilter';

export class TogglePlayerAvailabilityStatus {
  static readonly type = `[${name}] SetPlayerAvailabilityStatus`;
  constructor(public payload: { availabilityStatus: PlayerAvailabilityStatus }) {}
}

export class SetPagination {
  static readonly type = `[${name}] SetPagination`;
  constructor(public payload: { sortStatId: string; sortDirection: string; currentPageSize: number; currentPageIndex: number }) {}
}

export class SetLineupSlotId {
  static readonly type = `[${name}] ToggleLineupSlotId`;
  constructor(public payload: { lineupSlotId: FootballLineupSlot }) {}
}
