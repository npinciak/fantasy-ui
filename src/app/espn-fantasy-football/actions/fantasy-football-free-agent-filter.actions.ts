import { FootballLineupSlot } from '@sports-ui/ui-sdk/espn';
import { PlayerAvailabilityStatus } from '@sports-ui/ui-sdk/espn-client';

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

export class SetScoringPeriodId {
  static readonly type = `[${name}] SetScoringPeriodId`;
  constructor(public payload: { scoringPeriodId: string }) {}
}
