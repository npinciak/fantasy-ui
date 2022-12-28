import { EspnClient } from 'sports-ui-sdk';

import { FootballLineupSlot } from '../models/football-lineup.model';

const name = 'fantasyFootballFreeAgentsFilter';

export class TogglePlayerAvailabilityStatus {
  static readonly type = `[${name}] SetPlayerAvailabilityStatus`;
  constructor(public payload: { availabilityStatus: EspnClient.FreeAgentAvailabilityStatus }) {}
}

export class SetPagination {
  static readonly type = `[${name}] SetPagination`;
  constructor(public payload: { sortStatId: string; sortDirection: string; currentPageSize: number; currentPageIndex: number }) {}
}

export class SetLineupSlotId {
  static readonly type = `[${name}] ToggleLineupSlotId`;
  constructor(public payload: { lineupSlotId: FootballLineupSlot }) {}
}
