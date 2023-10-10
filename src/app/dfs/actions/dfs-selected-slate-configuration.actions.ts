export class DfsSelectedSlateConfigurationActions {
  static stateName = 'dfsSelectedSlateConfiguration';

  static SetSlateId = class {
    static readonly type = `[${DfsSelectedSlateConfigurationActions.stateName}] SetSlateId`;
    constructor(public payload: { slateId: string | null }) {}
  };

  static SetSite = class {
    static readonly type = `[${DfsSelectedSlateConfigurationActions.stateName}] SetSite`;
    constructor(public payload: { site: string | null }) {}
  };

  static SetPath = class {
    static readonly type = `[${DfsSelectedSlateConfigurationActions.stateName}] SetPath`;
    constructor(public payload: { path: string | null }) {}
  };

  static SetSport = class {
    static readonly type = `[${DfsSelectedSlateConfigurationActions.stateName}] SetSport`;
    constructor(public payload: { sport: string | null }) {}
  };
}
