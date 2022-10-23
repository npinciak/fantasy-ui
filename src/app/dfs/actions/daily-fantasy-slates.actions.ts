import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';

export class FetchSlates {
  public static readonly type = `[dailyFantasySlate] FetchSlates`;
  constructor(public payload: { site: string; sport: string }) {}
}

export class SetSlates {
  static readonly type = `[dailyFantasySlates] SetSlates`;
  constructor(public payload: SiteSlateEntity[]) {}
}

export class ClearAndAddSlates {
  static readonly type = `[dailyFantasySlates] ClearAndAddSlates`;
  constructor(public payload: SiteSlateEntity[]) {}
}
