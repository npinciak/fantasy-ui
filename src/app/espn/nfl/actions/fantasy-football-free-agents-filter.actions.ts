import { FootballLineupSlot } from '../models/football-lineup.model';

export class PatchPlayerAvailabilityStatus {
  static readonly type = '[fantasyFootballFreeAgentsFilter] PatchPlayerAvailabilityStatus';
  constructor(public payload: string) {}
}

export class SetPagination {
  static readonly type = '[fantasyFootballFreeAgentsFilter] SetPagination';
  constructor(public payload: { sortStatId: string; sortDirection: string; currentPageSize: number; currentPageIndex: number }) {}
}

export class ToggleScoringPeriodIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] PatchScoringPeriodIds';
  constructor(public payload: { scoringPeriodIds: string[] }) {}
}

export class ToggleStatIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] ToggleStatIds';
  constructor(public payload: { statIds: string[] }) {}
}

export class ToggleLineupSlotIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] ToggleLineupSlotIds';
  constructor(public payload: { lineupSlotIds: FootballLineupSlot[] }) {}
}

export class RemovePlayerAvailabilityStatus {
  static readonly type = '[fantasyFootballFreeAgentsFilter] RemovePlayerAvailabilityStatus';
  constructor(public collectionIndex: number) {}
}

export class RemoveScoringPeriodIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] RemoveScoringPeriodIds';
  constructor(public collectionIndex: number) {}
}

export class RemoveLineupSlotIds {
  static readonly type = '[fantasyFootballFreeAgentsFilter] RemoveLineupSlotIds';
  constructor(public payload: { lineupSlotIds: FootballLineupSlot[] }) {}
}
