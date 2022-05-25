import { SiteSlateEntity } from '../models/daily-fantasy-client.model';

export class FetchSlates {
  public static readonly type = `[dailyFantasySlate] FetchSlates`;
  constructor(public payload: { site: string; sport: string }) {}
}

export class PatchSlates {
  static readonly type = `[dailyFantasySlates] PatchSlates`;
  constructor(public payload: SiteSlateEntity[]) {}
}
