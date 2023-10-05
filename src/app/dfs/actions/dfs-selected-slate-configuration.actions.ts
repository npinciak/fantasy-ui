export class DfsSelectedSlateConfiguration {
  static stateName = 'dfsSelectedSlateConfiguration';

  static SetSlateId = class {
    static readonly type = `[${DfsSelectedSlateConfiguration.stateName}] SetSlateId`;
    constructor(public payload: { slateId: string | null }) {}
  };

  static SetSite = class {
    static readonly type = `[${DfsSelectedSlateConfiguration.stateName}] SetSite`;
    constructor(public payload: { site: string | null }) {}
  };

  static SetPath = class {
    static readonly type = `[${DfsSelectedSlateConfiguration.stateName}] SetPath`;
    constructor(public payload: { path: string | null }) {}
  };

  static SetSport = class {
    static readonly type = `[${DfsSelectedSlateConfiguration.stateName}] SetSport`;
    constructor(public payload: { sport: string | null }) {}
  };
}
