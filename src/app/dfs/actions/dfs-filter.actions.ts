import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';

export class DfsFilterActions {
  static stateName = 'dfsFilter';

  static SetTeam = class {
    static readonly type = `[${DfsFilterActions.stateName}] SetTeam`;
    constructor(public payload: { team: string | null }) {}
  };

  static SetPosition = class {
    static readonly type = `[${DfsFilterActions.stateName}] SetPosition`;
    constructor(public payload: { position: string | null }) {}
  };

  static SetName = class {
    static readonly type = `[${DfsFilterActions.stateName}] SetName`;
    constructor(public payload: { name: string | null }) {}
  };

  static SetProjectionType = class {
    static readonly type = `[${DfsFilterActions.stateName}] SetProjectionType`;
    constructor(public payload: { projectionType: GridIronProjectionType }) {}
  };
}
