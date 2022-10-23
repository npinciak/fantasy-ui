import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';

export const name = 'dailyFantasySlate';

export class FetchSlates {
  public static readonly type = `[${name}] FetchSlates`;
}

export class SetSlates {
  static readonly type = `[${name}] SetSlates`;
  constructor(public payload: SiteSlateEntity[]) {}
}

export class ClearAndAddSlates {
  static readonly type = `[${name}] ClearAndAddSlates`;
  constructor(public payload: SiteSlateEntity[]) {}
}
