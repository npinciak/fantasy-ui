import { FantasySports } from '../models/espn-endpoint-builder.model';
import { SportsUiClientLeague } from '../models/league.model';

export class VerifyEspnLeagues {
  static readonly type = `[espnLeagues] VerifyEspnLeagues`;
  constructor(public payload: { leagueSport: FantasySports | null; leagueId: string | null; year: string | null }) {}
}

export class FetchEspnLeagues {
  static readonly type = `[espnLeagues] FetchEspnLeagues`;
}

export class DeleteEspnLeague {
  static readonly type = `[espnLeagues] DeleteEspnLeague`;
  constructor(public payload: { id: number }) {}
}

export class SetEspnLeagues {
  static readonly type = `[espnLeagues] SetEspnLeagues`;
  constructor(public payload: SportsUiClientLeague[]) {}
}
